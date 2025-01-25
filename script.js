let files = [];
let results = [];

document.getElementById("fileInput").addEventListener("change", handleFileSelect);

function handleFileSelect(event) {
    files = event.target.files;
    document.getElementById("formContainer").innerHTML = ""; // Reset formContainer

    if (files.length > 0) {
        Array.from(files).forEach((file, index) => {
            let form = document.createElement("div");
            form.classList.add("fileForm");
            form.innerHTML = `
                <label for="vcfName${index}">Nama untuk File VCF:</label>
                <input type="text" id="vcfName${index}" placeholder="Nama File VCF" />
                <label for="adminName${index}">Nama Kontak 1 (Admin):</label>
                <input type="text" id="adminName${index}" placeholder="Nama Kontak Admin" value="ADMIN" />
                <label for="userName${index}">Nama Kontak Bawah (User):</label>
                <input type="text" id="userName${index}" placeholder="Nama Kontak User" value="USER" />
            `;
            document.getElementById("formContainer").appendChild(form);
        });
    }
}

function convertFiles() {
    results = [];
    Array.from(files).forEach((file, index) => {
        const vcfName = document.getElementById(`vcfName${index}`).value;
        const adminName = document.getElementById(`adminName${index}`).value;
        const userName = document.getElementById(`userName${index}`).value;

        const reader = new FileReader();
        reader.onload = function(event) {
            const txtContent = event.target.result;
            const lines = txtContent.split("\n").map(line => line.trim()).filter(line => line);
            const adminNumber = lines[0].replace("Admin===", "").trim();
            const userNumbers = lines.slice(1);

            let adminContact = formatVCF(adminNumber, `${adminName} 1`);
            let userContacts = userNumbers.map((number, i) => formatVCF(number, `${userName} ${i + 1}`));

            results.push({
                vcfName: vcfName || file.name.split(".")[0],
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

    results.forEach((result, index) => {
        let resultContainer = document.createElement("div");
        resultContainer.classList.add("result");

        let vcfFileNameAdmin = `${result.vcfName}_ADMIN.vcf`;
        let vcfFileNameUser = `${result.vcfName}.vcf`;

        resultContainer.innerHTML = `
            <h3>Nama File: ${result.vcfName}</h3>
            <p><strong>VCF Admin:</strong> <a href="data:text/vcard;base64,${btoa(result.adminContact)}" download="${vcfFileNameAdmin}">Download</a></p>
            <p><strong>VCF User:</strong> <a href="data:text/vcard;base64,${btoa(result.userContacts.join("\n"))}" download="${vcfFileNameUser}">Download</a></p>
        `;

        container.appendChild(resultContainer);
    });
}
