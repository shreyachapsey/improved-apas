function getGrades() {
  let url = window.location.href;
  if (url.includes("apas.umn.edu")) {
    console.log("YOU ARE ON APAS");
    if (url.includes("/selfservice/audit/read.html")) {
      console.log("YOU ARE ON REPORT");

      let earned_credits = parseFloat(document.getElementsByClassName("hours number")[0].innerText);
      let current_credits = parseFloat(document.getElementsByClassName("hours number")[1].innerText);
      let remaining_credits = parseFloat(document.getElementsByClassName("hours number")[2].innerText);
      let credit_list = [earned_credits, current_credits, remaining_credits];

      let table = document.getElementsByClassName("completedCourses")[0].tBodies[0];
      let course_history = [];
      var i;
      for (i = 0; i < table.rows.length; i++) {
        course_row = [];
        var j;
        for (j = 0; j < table.rows[i].cells.length - 1; j++) {

          course_row.push(table.rows[i].cells[j].innerText)
        }
        innerTable = table.rows[i].cells[j].querySelector("table").tBodies[0];
        last_cell = [];
        for (let k = 0; k < innerTable.rows.length; k++) {
          for (let l = 0; l < innerTable.rows[k].cells.length; l++) {
            last_cell.push(innerTable.rows[k].cells[l].innerText)
          }

        }
        course_row.push(last_cell);


        course_history.push(course_row);
      }




      console.log(course_history);
      chrome.storage.local.set({ "course_history": course_history }, function () {
        console.log(`Storage now contains ${course_history}.`);
      });


      chrome.storage.local.set({ "credit_list": credit_list }, function () {
        console.log(`Storage now contains ${credit_list}.`);
      });
      chrome.runtime.sendMessage({ action: 'openNewTab' });
      console.log("message sent to bg");


      // for (var i = 0; i < table.rows.length; i++) {
      //   let credit = table.rows[i].cells[2].innerText;
      //   total_credits += parseFloat(credit);
      // }


    }
  }
}
getGrades();
