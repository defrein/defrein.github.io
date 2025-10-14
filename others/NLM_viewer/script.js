let table;
let journalData = [];
let visibleFields = ["title", "publisher", "country", "link_jurnal", "link_lainnya"];

document.getElementById("saveBtn").addEventListener("click", saveJSON);
document.getElementById("settingsBtn").addEventListener("click", openSettings);
document.getElementById("applySettings").addEventListener("click", applySettings);
document.getElementById("closeSettings").addEventListener("click", closeSettings);

async function loadJSON() {
  // Cek localStorage dulu
  const saved = localStorage.getItem("journalData");
  if (saved) {
    journalData = JSON.parse(saved);
    console.log("📂 Data dimuat dari localStorage");
  } else {
    // Kalau belum ada, ambil dari file
    const response = await fetch("journals.json");
    journalData = await response.json();
    console.log("📂 Data dimuat dari journals.json");
  }

  // Tambahkan kolom baru jika belum ada
  journalData.forEach((d) => {
    d.link_jurnal = d.link_jurnal || "";
    d.link_lainnya = d.link_lainnya || "";
  });

  renderTable();
  setupSettings();
}

function renderTable() {
  if (table) {
    table.destroy();
    $("#journalTable").empty();
  }

  const columns = visibleFields.map((key) => ({
    title: key,
    data: key,
  }));

  table = $("#journalTable").DataTable({
    data: journalData,
    columns,
    paging: true,
    searching: true,
    createdRow: function (row, rowData) {
      $("td", row).each(function (index) {
        const key = columns[index].data;
        if (key === "link_jurnal" || key === "link_lainnya") {
          $(this).attr("contenteditable", true);
          $(this).on("blur", function () {
            const newValue = $(this).text().trim();
            rowData[key] = newValue;
            autoSave(); // Auto-save setiap perubahan
          });
        }
      });
    },
  });
}

function saveJSON() {
  localStorage.setItem("journalData", JSON.stringify(journalData));
  alert("✅ Data tersimpan di localStorage!");
}

function autoSave() {
  localStorage.setItem("journalData", JSON.stringify(journalData));
  console.log("💾 Auto-saved");
}

function openSettings() {
  document.getElementById("settingsModal").classList.remove("hidden");
}

function closeSettings() {
  document.getElementById("settingsModal").classList.add("hidden");
}

function setupSettings() {
  const allKeys = Object.keys(journalData[0] || {});
  const fieldList = document.getElementById("fieldList");
  fieldList.innerHTML = "";

  allKeys.forEach((key) => {
    const checked = visibleFields.includes(key) ? "checked" : "";
    fieldList.innerHTML += `
      <label>
        <input type="checkbox" value="${key}" ${checked}> ${key}
      </label>
    `;
  });
}

function applySettings() {
  const checkboxes = document.querySelectorAll("#fieldList input[type='checkbox']");
  visibleFields = Array.from(checkboxes)
    .filter((c) => c.checked)
    .map((c) => c.value);

  renderTable();
  closeSettings();
}

loadJSON();