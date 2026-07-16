<?php
/**
 * GetSeen Demo-Generator — PHP-Endpoint (Hostinger, kein Cloudflare nötig)
 *
 * Installation:
 *   1. Diese Datei nach public_html/api/demo.php hochladen (Hostinger Dateimanager).
 *   2. Daneben eine Datei public_html/api/config.php anlegen mit:
 *        <?php return ["ANTHROPIC_API_KEY" => "sk-ant-…"];
 *      (Key erstellen unter console.anthropic.com → API Keys)
 *   3. Fertig — die Website ruft POST /api/demo.php auf: {prompt} → {html}
 *
 * Hinweis: bewusst ohne Composer/SDK als einzelne hochladbare Datei gehalten;
 * mit Composer-Zugang wäre das offizielle PHP-SDK (anthropic-ai/sdk) die
 * sauberere Wahl.
 */

const MODEL = "claude-opus-4-8";
const MAX_TOKENS = 16000;

const ALLOWED_ORIGINS = [
    "https://www.getseen.shop",
    "https://getseen.shop",
    "https://admingetseen-lang.github.io",
    "http://localhost:5173",
];

const SYSTEM_PROMPT = <<<'PROMPT'
Du bist der Website-Generator von GetSeen (getseen.shop), einer deutschen Agentur für KI-Webdesign. Aus einem kurzen Briefing erzeugst du eine beeindruckende, professionelle One-Page-Website, die ein lokaler Unternehmer sofort live schalten wollen würde.

AUSGABE
- Antworte AUSSCHLIESSLICH mit einem vollständigen HTML-Dokument, beginnend mit <!DOCTYPE html>. Kein Markdown, keine Code-Fences, keine Erklärungen.
- Eine einzige Datei: CSS in <style>, minimales JS in <script>. Keine externen Bibliotheken, Frameworks oder CDNs.

PERFORMANCE (nicht verhandelbar — die Seite muss extrem schnell laden)
- Keine externen Bilder: visuelle Tiefe durch CSS-Gradients, Inline-SVG-Motive und Formen.
- Höchstens EINE Google-Font-Familie (mit <link rel="preconnect">), sonst System-Fonts.
- JS unter 60 Zeilen: nur IntersectionObserver für Scroll-Reveals und Mobile-Menü-Toggle.
- Meta viewport, meta description, sinnvoller <title>. Semantisches HTML (header/main/section/footer, genau ein h1).

DESIGN — hochwertig und eigenständig, kein Baukasten-Look
- Wähle Farbwelt und Typografie passend zur Branche und zum gewünschten Stil aus dem Briefing; setze sie konsequent als CSS-Variablen um. Vermeide beliebige Standard-Optik: keine 08/15-Layouts, kein lila Verlauf auf Weiß als Selbstzweck, keine austauschbaren Karten-Raster ohne Charakter.
- Ein prägnantes visuelles Leitmotiv (z. B. Glass-Panels mit backdrop-filter, ein Duotone-Verlauf, eine markante Displayschrift) — durchgängig, nicht dekorativ verstreut.
- Großzügiger Weißraum, klare Hierarchie, Body-Text ≥ 17px, Zeilenlänge ≤ 70ch, WCAG-AA-Kontrast.
- Dezente Scroll-Reveals (opacity/translate, einmalig, 0.5–0.7s ease-out) und Hover-Zustände auf allen interaktiven Elementen. @media (prefers-reduced-motion: reduce) deaktiviert alle Animationen.
- Vollständig responsiv: Mobile zuerst sauber, Navigation mit Burger-Menü unter 768px.

STRUKTUR (an das Briefing anpassen, nicht stur abarbeiten)
1. Fixe Navigation mit Firmenname/Wortmarke und Anker-Links
2. Hero: kraftvolle Headline aus Angebot+USP (nicht den Firmennamen als Headline), Subline, primärer CTA aus dem Briefing
3. Leistungen/Angebot als klar gestaltete Sektion
4. USP/Vorteile — konkret und glaubwürdig formuliert
5. Über uns / Vertrauen (nutze Standort, falls angegeben)
6. Kontakt: Formular (nur UI, kein Versand, ein Hinweis dazu), Telefon/Adresse falls im Briefing
7. Footer mit © Jahr Firmenname und Platzhalter-Links Impressum/Datenschutz

TEXTE
- Alle Texte auf Deutsch, an die Zielgruppe aus dem Briefing gerichtet: konkret, nutzenorientiert, ohne Marketing-Floskeln („Willkommen auf unserer Website" ist verboten).
- Fehlende Angaben plausibel und branchenüblich ergänzen — niemals Lorem Ipsum oder [Platzhalter].
PROMPT;

// ---------------------------------------------------------------------------

function cors_headers(): void
{
    $origin = $_SERVER["HTTP_ORIGIN"] ?? "";
    $allow = in_array($origin, ALLOWED_ORIGINS, true) ? $origin : ALLOWED_ORIGINS[0];
    header("Access-Control-Allow-Origin: $allow");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Vary: Origin");
}

function respond(int $status, array $body): never
{
    http_response_code($status);
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

/** Entfernt versehentliche Markdown-Fences und Text vor <!DOCTYPE. */
function extract_html(string $text): string
{
    $out = trim($text);
    if (preg_match('/```(?:html)?\s*([\s\S]*?)```/', $out, $m)) {
        $out = trim($m[1]);
    }
    $pos = stripos($out, "<!doctype html");
    if ($pos > 0) {
        $out = substr($out, $pos);
    }
    return $out;
}

cors_headers();

if (($_SERVER["REQUEST_METHOD"] ?? "") === "OPTIONS") {
    http_response_code(204);
    exit;
}
if (($_SERVER["REQUEST_METHOD"] ?? "") !== "POST") {
    respond(405, ["error" => "Nur POST wird unterstützt."]);
}

$config = @include __DIR__ . "/config.php";
$apiKey = is_array($config) ? ($config["ANTHROPIC_API_KEY"] ?? "") : "";
if ($apiKey === "") {
    respond(500, ["error" => "config.php mit ANTHROPIC_API_KEY fehlt."]);
}

$body = json_decode(file_get_contents("php://input"), true);
$prompt = is_array($body) ? trim((string) ($body["prompt"] ?? "")) : "";
$prompt = mb_substr($prompt, 0, 8000);
if (mb_strlen($prompt) < 10) {
    respond(400, ["error" => "Bitte ein Briefing mit mindestens Firma und Branche angeben."]);
}

set_time_limit(300);

$payload = [
    "model" => MODEL,
    "max_tokens" => MAX_TOKENS,
    // Kein "thinking"-Feld: läuft auf Opus 4.8 ohne Thinking (niedrigste Latenz).
    "output_config" => ["effort" => "low"],
    "system" => [
        [
            "type" => "text",
            "text" => SYSTEM_PROMPT,
            "cache_control" => ["type" => "ephemeral"],
        ],
    ],
    "messages" => [["role" => "user", "content" => "Briefing:\n" . $prompt]],
];

$ch = curl_init("https://api.anthropic.com/v1/messages");
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 240,
    CURLOPT_CONNECTTIMEOUT => 15,
    CURLOPT_HTTPHEADER => [
        "x-api-key: " . $apiKey,
        "anthropic-version: 2023-06-01",
        "content-type: application/json",
    ],
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
]);
$raw = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
$curlErr = curl_error($ch);
curl_close($ch);

if ($raw === false) {
    respond(502, ["error" => "Anthropic API nicht erreichbar: " . $curlErr]);
}

$data = json_decode($raw, true);
if ($status !== 200) {
    $msg = $data["error"]["message"] ?? "HTTP $status";
    respond($status === 429 || $status === 529 ? 503 : 502, [
        "error" => "Generierung fehlgeschlagen: " . $msg,
    ]);
}

if (($data["stop_reason"] ?? "") === "refusal") {
    respond(422, ["error" => "Dieses Briefing kann nicht umgesetzt werden. Bitte anders formulieren."]);
}

$text = "";
foreach ($data["content"] ?? [] as $block) {
    if (($block["type"] ?? "") === "text") {
        $text .= $block["text"];
    }
}
$html = extract_html($text);

if (stripos($html, "<!doctype html") !== 0) {
    respond(502, ["error" => "Unerwartetes Ausgabeformat — bitte erneut versuchen."]);
}
if (($data["stop_reason"] ?? "") === "max_tokens") {
    respond(502, ["error" => "Die Seite wurde zu lang und abgeschnitten — bitte erneut versuchen."]);
}

respond(200, ["html" => $html]);
