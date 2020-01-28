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


$(document).ready(function(){
  var wholeList = new TaskList();
  $(".btn").on("click", function(){
    event.preventDefault();
    var task = $("input#task").val();
    var buttonId = this.id;

    if (task !== "" && buttonId === "submit"){
      var currentTask = new Task(task);
      wholeList.addTask(currentTask);
      console.log(wholeList.tasklist);
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = currentTask.id;
      checkbox.value = currentTask.id;
      console.log("checkbox id",checkbox.id);
      checkbox.name = task;
      var label = document.createElement("label");
      label.innerHTML = task;
      label.id = currentTask.id;
      console.log(label.id);
      $("#checklist").append(checkbox);
      $("#checklist").append(label);
      $("#checklist").append(document.createElement("br"));
      
    }
    else if (buttonId === "delete"){
      var n = $("input:checked").length;
      console.log("num checked", n);
      if (n > 0){
        $("input:checked").each(function(){
          var removeId = $("input:checked").val();
          console.log(removeId);
          var removed = wholeList.deleteTask(removeId);
          console.log(wholeList.tasklist);
          //Does delete out of array, Need to delete checkbox and text
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