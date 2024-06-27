// * This printer is an example for a node application (like using with Electron)
const { Printer } = require("@node-escpos/core");
// install escpos-usb adapter module manually
const USB = require("@node-escpos/usb-adapter");
// Select the adapter based on your printer type

const device = new USB();
// This could be set with vendorId and productId

device.open(async function (err) {
  if (err) {
    // handle error
    return;
  }

  // encoding is optional
  const options = { encoding: "GB18030" /* default */ };
  let printer = new Printer(device, options);

  printer
    .font("a")
    .align("ct")
    .style("bu")
    .size(1, 1)
    .text("This is a test")
    .text("Of how the printer works")
    .text("all with USB")
    .text("恭喜发财")
    .barcode(112233445566, "EAN13", { width: 50, height: 50 })
    .table(["One", "Two", "Three"])
    .tableCustom(
      [
        { text: "Left", align: "LEFT", width: 0.33, style: "B" },
        { text: "Center", align: "CENTER", width: 0.33 },
        { text: "Right", align: "RIGHT", width: 0.33 },
      ],
      { encoding: "cp857", size: [1, 1] } // Optional
    );

  // inject qrimage to printer
  printer = await printer.qrimage("https://github.com/node-escpos/driver");
  // inject image to printer

  printer.cut().close();
});
