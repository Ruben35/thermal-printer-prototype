import ThermalPrinterEncoder from "thermal-printer-encoder";

// * Printer USB device
var deviceGlobal;

// * Listeners
document.getElementById("connect").addEventListener("click", connect);

document.getElementById("print").addEventListener("click", () => {
  if (deviceGlobal) {
    print();
  } else {
    alert("There is no printer device connected!");
  }
});

// * Printer functions
function connect() {
  navigator.usb
    .requestDevice({ filters: [{ vendorId: 0x04b8 }] })
    .then((device) => {
      deviceGlobal = device;
      setup(device);
    })
    .catch((error) => {
      console.error(error);
    });
}

function setup(device) {
  return device
    .open()
    .then(() => device.selectConfiguration(1))
    .then(() => device.claimInterface(0))
    .catch((error) => {
      console.error(error);
    });
}

function print() {
  let encoder = new ThermalPrinterEncoder({ language: "esc-pos" });

  let printCommands = encoder
    .initialize()
    .text("This is made via USB but web!")
    .newline()
    .text("This is a test for the web")
    .qrcode("https://nielsleenheer.com")
    .newline()
    .newline()
    .newline()
    .newline()
    .cut()
    .encode();

  deviceGlobal.transferOut(1, printCommands).catch((error) => {
    console.error(error);
  });
}
