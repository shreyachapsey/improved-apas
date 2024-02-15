console.log("popup loaded");

console.log(document.getElementById("total_credits").innerHTML);

const readLocalStorage = async (key) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([key], function (result) {
        if (result[key] === undefined) {
          reject();
        } else {
          resolve(result[key]);
        }
      });
    });
  };
async function getData() {
    let course_history = await readLocalStorage('course_history');
    let credit_list = await readLocalStorage('credit_list');

    updateCreditValues(credit_list);
    displayCourseHistory(course_history);

}
function updateCreditValues(credit_list){
  total_credits = credit_list[0] + credit_list[1]
  document.getElementById("total_credits").innerHTML = total_credits
  degree_progress = document.getElementById("degree_progress")
  degree_progress.value = total_credits;
  degree_progress.max = total_credits + credit_list[2];
  document.getElementById("degree_percentage").innerHTML = Math.round((10000*degree_progress.value / degree_progress.max))/100 + "%\n" ;
  


}
function displayCourseHistory(course_history){
    console.log(`storage's value is ${course_history}`);
    table = document.getElementById("course_history");
    for (let i = 0; i < course_history.length; i++) {
      tr = table.insertRow();
      for (let j = 0; j < course_history[i].length; j++) {
        td = tr.insertCell();
        td.innerHTML = course_history[i][j];
        
      }
      
    }
}
getData();