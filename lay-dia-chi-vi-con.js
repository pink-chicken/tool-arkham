function isValidCryptoAddress(address) {
  const ethPattern = /^0x[a-fA-F0-9]{40}$/; // Basic Ethereum validation
  const tronPattern = /^T[a-zA-Z0-9]{33}$/; // Basic Tron validation (Base58)
  const btcPattern =
    /^(1|3)[a-zA-HJ-NP-Z0-9]{25,34}$|^bc1[a-zA-HJ-NP-Z0-9]{11,71}$/; // Basic Bitcoin validation (P2PKH, P2SH, Bech32)

  if (ethPattern.test(address)) {
    return true;
  } else if (tronPattern.test(address)) {
    return true;
  } else if (btcPattern.test(address)) {
    return true;
  } else {
    return false;
  }
}

function showCopyUI() {
  // Create the overlay div
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.style.cssText =
    "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgb(0 0 0 / 91%); display: flex; justify-content: center; align-items: center; z-index: 1000;";

  // Create the copy button
  const copyButton = document.createElement("button");
  copyButton.id = "copyButton";
  copyButton.textContent = "Bấm vào đây để Copy địa chỉ ví";
  copyButton.style.cssText =
    "padding: 10px 20px; font-size: 16px; cursor: pointer; ";

  // Append the button to the overlay, then overlay to the body
  overlay.appendChild(copyButton);
  document.body.appendChild(overlay);

  setTimeout(() => {
    // Add click event listener to copy button
    document
      .getElementById("copyButton")
      .addEventListener("click", function () {
        // Use the Clipboard API
        navigator.clipboard
          .writeText(listAddress)
          .then(() => {
            console.log("Text copied to clipboard");
            // Remove the overlay div
            document.body.removeChild(overlay);
            alert("Đã copy danh sách địa chỉ ví vào bộ nhớ.");
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err);
          });
      });
  }, 500);
}

let listAddress = "";
function getAddress() {
  const parties = document.querySelectorAll(
    ".TokenTopHolders_topHoldersGrid__uA8Pc .TokenTopHolders_topHolderCounterparty__xspM5"
  );

  const addresses = Array.from(parties)
    .map((party) => party.textContent.trim())
    .filter((x) => isValidCryptoAddress(x));

  listAddress = addresses
    .map((x, index) => `${index + 1}-${x.slice(0, 8)},${x}`)
    .join("\n");

  showCopyUI();
}

getAddress();
