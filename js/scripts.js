// Business logic
function TaskList() {
  this.tasklist = [];
  this.currentId = 0;
}

TaskList.prototype.addTask = function(task) {
  task.id = this.assignId();
  this.tasklist.push(task);
  
}

TaskList.prototype.assignId = function() {
  this.currentId +=1;
  
  return this.currentId;
}

TaskList.prototype.findTask = function(id){
  for (var i=0; i< this.tasklist.length; i++) {
    if (this.tasklist[i]) {
      if (this.tasklist[i].id == id) {
        return this.tasklist[i];
      }
    }
  };
  return false;
}

TaskList.prototype.deleteTask = function(id) {
  for (var i=0; i<this.tasklist.length; i++) {
    if(this.tasklist[i]) {
      if(this.tasklist[i].id == id) {
        delete this.tasklist[i];
        return true;
      }
    }
  };
  return false;
}

function Task(task){
  this.task = task;
}

// User Interface Logic
var wholeList = new TaskList();

function createCheckbox(entry){
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = entry.id;
  checkbox.value = entry.id;
  checkbox.name = entry.task.toString();

  var label = document.createElement("label");
  label.innerHTML = entry.task.toString();
  label.name = entry.task.toString();
  label.id = entry.id;

  var text = "<label id=" + label.id + "> " + label.innerHTML + "</label><br id=" + label.id +">";
  $("#checklist").append(checkbox);
  $("#checklist").append(text);
};

$(document).ready(function(){
  $(".btn").on("click", function(){
    event.preventDefault();

    var task = $("input#task").val();
    var buttonId = this.id;

    if (task !== "" && buttonId === "submit"){
      var currentTask = new Task(task);
      wholeList.addTask(currentTask);
      createCheckbox(currentTask);
      
    }
    else if (buttonId === "delete"){
      var n = $("input:checked").length;
      if (n > 0){
        $("input:checked").each(function(){
          var removeId = $("input:checked").val();
          wholeList.deleteTask(removeId);
          this.remove();
          $("label").remove("#" +removeId);
          $("br").remove("#" + removeId);
        });
      }else{
        alert("No entries checked for deletion")
      }
    }
    else {
      alert("Invalid entry");
    }

  });
});