// Faz 4 koruması: tarayıcıda yalnız gezinme ve okuma araçlarına izin verir.
// İzin listesi kullanılır; Playwright MCP'ye yeni bir araç eklenirse o da kendiliğinden kapalı kalır.
// Yazma, tuşa basma, çerez ve depolama okuma, ağ isteklerini görme, sayfada kod çalıştırma engellidir.
// Claude Code PreToolUse kancası olarak çalışır. Çıkış 2, aracı durdurur ve mesajı modele iletir.
const IZINLI = /__browser_(navigate|navigate_back|snapshot|take_screenshot|click|hover|wait_for|tabs|close|resize|find|verify_[a-z_]+|pdf_save|mouse_wheel)$/;

let girdi = "";
process.stdin.on("data", (p) => (girdi += p));
process.stdin.on("end", () => {
  let arac = "";
  try { arac = JSON.parse(girdi).tool_name || ""; } catch { /* boş girdi */ }
  if (!/__browser_/.test(arac) || IZINLI.test(arac)) process.exit(0);
  process.stderr.write(
    `Akreddit bu sürümde kurum sistemlerini yalnız okur. "${arac.split("__").pop()}" kapalı. ` +
    "Giriş bilgilerini kullanıcı tarayıcı penceresine kendisi yazar. Doldurulacak değerleri tablo olarak kullanıcıya göster.\n",
  );
  process.exit(2);
});
