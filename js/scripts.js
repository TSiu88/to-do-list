// Business logic
function Task() {
  this.tasklist = [];
  this.currentId = 0;
}
Task.prototype.addTask = function(task) {
  task.id = this.assignId();
  this.tasklist.push(task);
  
}
Task.prototype.assignId = function() {
  this.currentId +=1;
  
  return this.currentId;
}
Task.prototype.deleteTask = function(id) {
  for (var i=0; i<this.tasklist.length; i++) {
    if(this.tasklist[i]) {
      if(this.tasklist[i].id === id) {
        delete this.tasklist[i];
        return true;
      }
    }
  };
  return false;
}



$(document).ready(function(){
  var wholeList = new Task();
  $("#formOne").submit(function(event) {
    event.preventDefault();
    var task = $("input#task").val();
    if (task === ""){
      alert("Invalid entry");
    }
    else {
     
      wholeList.addTask(task);
      console.log(wholeList.tasklist);
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = task;
      checkbox.name = task;
      console.log(task.id);
      $("#checklist").append(checkbox);
      $("#checklist").append(" " + task + "<br>");
    }



  });
});