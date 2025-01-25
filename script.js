let files = [];
let results = [];

document.getElementById("fileInput").addEventListener("change", handleFileSelect);

function handleFileSelect(event) {
    files = event.target.files;
    document.getElementById("resultsContainer").innerHTML = ""; // Reset results container
}

function convertFiles() {
    const contactName1 = document.getElementById("contactName1").value.trim();
    const contactName2 = document.getElementById("contactName2").value.trim();
    
    if (!contactName1 || !contactName2) {
        alert("Harap masukkan nama untuk kedua kontak (Admin dan User)!");
        return;
    }

    results = [];
    Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const txtContent = event.target.result;
            const lines = txtContent.split("\n").map(line => line.trim()).filter(line => line);
            const adminNumber = lines[0].replace(/Admin[\s=]+/, "").trim();
            const userNumbers = lines.slice(1);

            // Format VCF contacts
            let adminContact = formatVCF(adminNumber, `${contactName1} 1`);
            let userContacts = userNumbers.map((number, i) => formatVCF(number, `${contactName2} ${i + 1}`));

            results.push({
                originalFileName: file.name.split(".")[0],
                adminContact: adminContact,
                userContacts: userContacts
            });

            if (index === files.length - 1) {
                displayResults();
            }
        };
        reader.readAsText(file);
    });
}

function formatVCF(number, name) {
    if (!number.startsWith("+")) {
        number = "+" + number.trim();
    }

    return `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${number}
END:VCARD`;
}

function displayResults() {
    const container = document.getElementById("resultsContainer");
    container.innerHTML = ""; // Reset results container

    results.forEach((result) => {
        let resultContainer = document.createElement("div");
        resultContainer.classList.add("result");

        let vcfFileNameAdmin = `${result.originalFileName}_ADMIN.vcf`;
        let vcfFileNameUser = `${result.originalFileName}.vcf`;

        resultContainer.innerHTML = `
            <h3>Nama File: ${result.originalFileName}</h3>
            <label for="vcfFileNameAdmin">Nama File VCF Admin:</label>
            <input type="text" id="vcfFileNameAdmin" value="${vcfFileNameAdmin}">
            <label for="vcfFileNameUser">Nama File VCF User:</label>
            <input type="text" id="vcfFileNameUser" value="${vcfFileNameUser}">
            <p><strong>VCF Admin:</strong> <a href="data:text/vcard;base64,${btoa(result.adminContact)}" download="${vcfFileNameAdmin}">Download Admin</a></p>
            <p><strong>VCF User:</strong> <a href="data:text/vcard;base64,${btoa(result.userContacts.join("\n"))}" download="${vcfFileNameUser}">Download User</a></p>
        `;

        container.appendChild(resultContainer);
    });
}
