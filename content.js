function getGrades() {
  let url = window.location.href;
  if (url.includes("apas.umn.edu")) {
    console.log("YOU ARE ON APAS");
    if (url.includes("/selfservice/audit/read.html")) {
      console.log("YOU ARE ON REPORT");

      let total_credits = parseFloat(document.getElementsByClassName("hours number")[0].innerText) + parseFloat(document.getElementsByClassName("hours number")[1].innerText);
      let remaining_credits = parseFloat(document.getElementsByClassName("hours number")[2].innerText);
      let progress = 100 * total_credits / (total_credits + remaining_credits);
      let semesters_left = Math.ceil(remaining_credits / 20);
      let table = document.getElementsByClassName("completedCourses")[0].tBodies[0];

      const tableHTML = table.outerHTML;

      chrome.storage.local.set({"total_credits": total_credits}, function() {
        console.log(`Storage now contains ${total_credits}.`);
    });
      chrome.runtime.sendMessage({ action: 'openNewTab', tableHTML });
      console.log("message sent to bg");


      // for (var i = 0; i < table.rows.length; i++) {
      //   let credit = table.rows[i].cells[2].innerText;
      //   total_credits += parseFloat(credit);
      // }
      console.log(total_credits);
      console.log(progress + "% Done");

    }
  }
}
getGrades();
