const https = require("https")
const fs = require("fs")
const os = require("os")
const p = require("path")

const bin = p.join(__dirname, "..", "bin")
if (!fs.existsSync(bin)) fs.mkdirSync(bin)
const plat = os.platform()
const win = plat === "win32"
const file = win ? "yt-dlp.exe" : "yt-dlp"
const out = p.join(bin, file)
const link = win
  ? "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe" // the main source 
  : "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp"

console.log(plat)
const dl = (u, d, done) => {
  https.get(u, (r) => {
    if (r.statusCode === 301 || r.statusCode === 302) return dl(r.headers.location, d, done)
    const f = fs.createWriteStream(d)
    r.pipe(f)
    f.on("finish", () => {
      f.close(() => {
        if (!win) fs.chmodSync(d, 0o755)
        console.log("yt-dlp downloaded")
        done()
      })
    })
  }).on("error", (e) => {
    fs.existsSync(d) && fs.unlinkSync(d)
    console.error(e.message)
  })
}

dl(link, out, () => {})
