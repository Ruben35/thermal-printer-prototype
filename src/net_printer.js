// * Image Loading for Ticket future use
var img = new Image();
img.src = "./images/bat.png";
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

img.onload = function () {
  //Create canvas and draw image
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  console.log("Image loaded!");
};

// Uncomment this for seeing the image on html
// document.getElementById("main").appendChild(canvas);

// * Connect to printer via network and print ticket

document.getElementById("print-net").addEventListener("click", connectAndPrint);

function connectAndPrint() {
  // Create an instance of epos
  var ePosDev = new window.epson.ePOSDevice();
  console.log("Connecting to the printer...");

  //Printer IP address
  var printerIp = "192.168.0.51"; //Replace with your printer IP address

  // Printer connection
  ePosDev.connect(printerIp, 8043, function (resultConnect) {
    if (resultConnect === "OK" || resultConnect === "SSL_CONNECT_OK") {
      console.log("Printer conected!");
      // Oobtain printer
      ePosDev.createDevice(
        "local_printer",
        ePosDev.DEVICE_TYPE_PRINTER,
        { crypto: false, buffer: false },
        function (device, resultCreate) {
          if (resultCreate === "OK") {
            var printer = device;
            console.log("Printing!");

            // Commands for printing ticket
            printer.addTextAlign(printer.ALIGN_CENTER);
            printer.addTextStyle(false, false, true, printer.COLOR_1);
            printer.addText("¡Im the Batman!\n");
            printer.addTextStyle(false, false, false, printer.COLOR_1);
            printer.addText("Ticket for raising from the darkness!\n");
            printer.addFeedLine(1);
            printer.addSymbol(
              "https://www.youtube.com/watch?v=HGx9ZZ9wMxc",
              printer.SYMBOL_QRCODE_MODEL_2,
              printer.LEVEL_L,
              10,
              10,
              0
            );
            printer.addFeedLine(1);
            printer.addTextStyle(false, false, true, printer.COLOR_1);
            printer.addImage(
              ctx, // Image
              0, // Position X
              0, // Position Y
              canvas.width, // Width of image
              canvas.height, // height of image
              printer.COLOR_1, // Color of image
              printer.MODE_MONO // Printing mode
            );
            printer.addFeedLine(1);
            printer.addTextStyle(false, false, true, printer.COLOR_1);
            printer.addText("Why do we fall? \n");
            printer.addText("So we can learn to pick ourselves up.");
            printer.addFeedLine(3);
            printer.addCut(printer.CUT_FEED);

            // Send commands to printer
            printer.send();
            console.log("Succesfull Printer!");
            alert("Succesfull Printer!");
          } else {
            console.error("Error on device creation: " + resultCreate);
            alert("Error on device creation: " + resultCreate);
          }
        }
      );
    } else {
      console.error("Connection Error: " + resultConnect);
      alert("Connection error: " + resultConnect);
    }
  });
}
