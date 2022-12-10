const Authenticate = require("../middleware/authMiddleware");
const User = require("../models/user");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const router = require("express").Router();

async function generateAccuntPDF(account) {
  let pdfDoc = new PDFDocument();
  pdfDoc.pipe(
    fs.createWriteStream(`${__dirname}/../tmp/output-${account._id}.pdf`)
  );
  let acceptedDate = new Date(account.updatedAt).toDateString();
  pdfDoc.text(`Votre invitation est accepter ${acceptedDate}`);
  pdfDoc.text(`Num Invitation # ${account._id}`);
  pdfDoc.text(`Nom: ${account.username}`);
  let rendezVouz = new Date(account.date).toDateString();
  pdfDoc.text(`Rendez-vouz: ${rendezVouz}`);
  pdfDoc.end();
}

router.get("/login", (req, res) => {
  res.render("login", { authenticated: !!req.session.authenticated });
});

router.get("/compte", Authenticate, async (req, res) => {
  const currentUser = await User.findById(req.session.user._id);
  const d = new Date(currentUser.date);
  const dateStr = d.toDateString();
  res.render("compte", {
    authenticated: !!req.session.authenticated,
    compte: currentUser,
    date: dateStr,
  });
});

router.get("/download/pdf", Authenticate, async (req, res) => {
  const currentUser = await User.findById(req.session.user._id);
  await generateAccuntPDF(currentUser).then(() => {
    setTimeout(()=>{
        res.download(`${__dirname}/../tmp/output-${currentUser._id}.pdf`);
    }, 1000)
  });
});
var QRCode = require('qrcode')


router.get("/download/qr", Authenticate, async(req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    QRCode.toDataURL(JSON.stringify(currentUser), function (err, url) {
        let regex = /^data:.+\/(.+);base64,(.*)$/;
        let data = url.match(regex)[2];
        let buffer = Buffer.from(data, 'base64');
        fs.writeFileSync(`${__dirname}/../tmp/qr-${currentUser._id}.png`, buffer);
        setTimeout(()=>{
            res.download(`${__dirname}/../tmp/qr-${currentUser._id}.png`);
        }, 2000)
      })
})


router.get("/inscription", (req, res) => {
  res.render("inscription", { authenticated: !!req.session.authenticated });
});

module.exports = router;
