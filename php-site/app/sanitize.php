<?php
declare(strict_types=1);

/**
 * Server-side sanitising of editor HTML with HTML Purifier (bundled in lib/, LGPL).
 * Restricted allowlist: headings, paragraphs, emphasis, lists, links, quotes, code.
 */
function sanitize_article_html(string $html): string
{
    static $purifier = null;
    if ($purifier === null) {
        require_once APP_ROOT . '/lib/htmlpurifier/HTMLPurifier.auto.php';
        $cfg = HTMLPurifier_Config::createDefault();
        $cfg->set('Core.Encoding', 'UTF-8');
        $cfg->set('HTML.Doctype', 'HTML 4.01 Transitional');
        $cfg->set('HTML.Allowed', 'p,br,h2,h3,h4,strong,b,em,i,u,ul,ol,li,blockquote,pre,code,a[href|title]');
        $cfg->set('URI.AllowedSchemes', ['http' => true, 'https' => true, 'mailto' => true]);
        $cfg->set('HTML.TargetNoopener', true);
        $cfg->set('HTML.Nofollow', false);
        $cfg->set('AutoFormat.RemoveEmpty', true);
        $cfg->set('Attr.AllowedFrameTargets', []);
        $cfg->set('Cache.SerializerPath', APP_ROOT . '/storage/cache/htmlpurifier');
        $purifier = new HTMLPurifier($cfg);
    }
    if (strlen($html) > 500000) {
        $html = substr($html, 0, 500000);
    }
    return trim($purifier->purify($html));
}
