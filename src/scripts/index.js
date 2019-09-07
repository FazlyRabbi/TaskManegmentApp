// importing  style form css module
import "../styles/main.css";
//importing http module
// import { http } from "./http";
//importing ui module
// import { ui } from "./ui.js";
//storage control

const StorageControl = (() => {
  return {
    addTask(task) {
      let tasks = [];

      if (localStorage.getItem("tasks") === null) {
        tasks.push(task);
      } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.push(task);
      }

      localStorage.setItem("tasks", JSON.stringify(tasks));
    },
    getTaks() {
      let tasks;
      if (localStorage.getItem("tasks") === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
      }
      return tasks;
    },
    updateTask(updatedTask) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      tasks.map(task => {
        if (task.id === updatedTask.id) {
          tasks.title = updatedTask.title;
          task.completed = updatedTask.completed;
        } else {
          return task;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    },
    deleteTask(deletedTask) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      tasks = deletedTask;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };
})();

//function to do control data and related task
//task control
const TaskControl = (() => {
  let data = {
    task: StorageControl.getTaks(),
    currentTask: null
  };

  return {
    getTask() {
      return data.task;
    },

    getTotalTaskCount() {
      return data.task.length;
    },
    getCompletedTaskCount() {
      return data.task.reduce((acc, CurrateTask) => {
        if (CurrateTask.completed === true) {
          acc++;
          return acc;
        } else {
          return acc;
        }
      }, 0);
    },
    getCurrateTask() {
      return data.currentTask;
    },

    deleteTask(currantTask) {
      const filteredTask = data.task.filter(task => task.id !== currantTask.id);
      data.task = filteredTask;
      return filteredTask;
    },
    updateDataToStorage(taskTitle) {
      let foundTask = null;
      data.task = data.task.map(task => {
        if (task.id === data.currentTask.id) {
          task.title = taskTitle;
          foundTask = task;
          return task;
        } else {
          return task;
        }
      });

      return foundTask;
    },
    setCurrentTask(taskToEdit) {
      data.currentTask = taskToEdit;
    },
    getTaskbyId(id) {
      return data.task.find(task => task.id === id);
    },
    addTask(taskTitle) {
      const id =
        data.task.length > 0 ? data.task[data.task.length - 1].id + 1 : 0;
      const task = {
        id,
        title: taskTitle,
        completed: false
      };

      const dataWithUpdatedTask = {
        ...data,
        task: [...data.task, task]
      };

      data = dataWithUpdatedTask;

      return task;
    },
    complateTask(id) {
      const resultAfterCompletion = data.task.map(task => {
        if (task.id === id) {
          task.completed = !task.completed;
          return task;
        } else {
          return task;
        }
      });
      data.task = resultAfterCompletion;
    }
  };
})();

//ui control
const UiControl = (() => {
  const selector = {
    taskTitle: ".task-title",
    taskContainer: ".task-container",
    taskItem: ".task-item",
    editeTask: ".editTask",
    complateTask: "#complated-task",
    addTask: "#addTask",
    updateTask: "#updateTask",
    backBtn: "#backBtn",
    deleteTask: "#deleteTask",
    totalTask: ".total-task",
    totalCompletedTask: ".completed-tast"
  };

  return {
    clearField() {
      document.querySelector(selector.taskTitle).value = "";
    },
    // show massege in ui
    showMsg(massage, className) {
      const div = document.createElement("div");
      div.className = `alert alert-${className}`;
      div.textContent = massage;
      const container = document.querySelector(".container");
      const h1 = document.querySelector("#h1");

      container.insertBefore(div, h1);
      setTimeout(() => {
        document.querySelector(".alert").remove();
      }, 2000);
    },
    populateTasks(task) {
      const { id, title } = task;

      let output = ``;
      output += `
        <div class="task-item" id="task-${id}">
        <div class="row">
        <div class="col col-sm-6">
            <h5>${title}</h5>   
          </div>   
          <div class="col col-sm-6 mt-3">    
            <a href="#" class="d-block" id="edit-task" style="float:right; "> <i class="fas fa-pencil-alt " id="edit-task"></i></a>
            <a href="#" style="float:right; margin-right:12px;"><i class="fas fa-check complete-task "  id="complated-task"></i></a>    
          </div 
        </div>
      </div>
    </div>`;

      document.querySelector(selector.taskContainer).style.display = "block";

      document
        .querySelector(selector.taskContainer)
        .insertAdjacentHTML("beforeend", output);
    },

    getSelectores() {
      return selector;
    },
    showCompletedTask(completedTask) {
      document.querySelector(".completed-tast").textContent = completedTask;
    },
    showTotalTaskCount(countTask) {
      document.querySelector(".total-task").textContent = countTask;
    },
    populateForm(taskTitleToEdit) {
      document.querySelector(selector.taskTitle).value = taskTitleToEdit;
      UiControl.showEditState();
    },
    showEditState() {
      document.querySelector(selector.addTask).style.display = "none";
      document.querySelector(selector.deleteTask).style.display =
        "inline-block";
      document.querySelector(selector.updateTask).style.display =
        "inline-block";
      document.querySelector(selector.backBtn).style.display = "inline-block";
    },
    clearEditState() {
      document.querySelector(selector.addTask).style.display = "block";
      document.querySelector(selector.deleteTask).style.display = "none";
      document.querySelector(selector.updateTask).style.display = "none";
      document.querySelector(selector.backBtn).style.display = "none";
    },
    getTitleInput() {
      return document.querySelector(selector.taskTitle).value;
    },
    populateTask(task) {
      if (task.length === 0) {
        document.querySelector(selector.taskContainer).style.display = "none";
      } else {
        let output = "";
        task.forEach(task => {
          const { id, title, completed } = task;
          output += `<div class="task-item" id="task-${id}">
              <div class="row">
              <div class="col col-sm-6">
                  <h5 class=${
                    completed === true ? "completed-task" : ""
                  }>${title}</h5>           
                </div>   
                <div class="col col-sm-6 mt-3">    
                  <a href="#" class="d-block"  style="float:right; "> <i class="fas fa-pencil-alt" id="edit-task" ></i></a>
                  <a href="#" style="float:right; margin-right:12px;"><i class="fas fa-check " id="complated-task"></i></a>    
                </div 
              </div>
            </div>
          </div>
        </div>`;
        });

        document.querySelector(selector.taskContainer).innerHTML = output;
      }
    }
  };
})();

//functin to do connection between thow deffrent module
//app control
const AppControl = (function(taskData, ui, StorageControl) {
  const loadEventListener = function() {
    const selector = UiControl.getSelectores();

    document
      .querySelector(selector.addTask)
      .addEventListener("click", TaskAddSubmit);

    document
      .querySelector(selector.updateTask)
      .addEventListener("click", updateTaskSubmit);
    document
      .querySelector(selector.deleteTask)
      .addEventListener("click", deleteTask);

    document.querySelector(selector.backBtn).addEventListener("click", backBtn);

    document
      .querySelector(selector.taskContainer)
      .addEventListener("click", taskEdit);

    document
      .querySelector(selector.taskContainer)
      .addEventListener("click", complatedTask);
  };

  //working with taskEdit button
  function taskEdit(e) {
    if (e.target.id === "edit-task") {
      const id = Number(
        e.target.parentElement.parentElement.parentElement.parentElement.id.split(
          "-"
        )[1]
      );

      const taskToUpdate = TaskControl.getTaskbyId(id);
      //update state in data sotrage
      TaskControl.setCurrentTask(taskToUpdate);

      //populate forme in edite state
      UiControl.populateForm(taskToUpdate.title);
    }
  }

  // working with update task sumbit
  function updateTaskSubmit(e) {
    e.preventDefault;
    //getting input
    const title = ui.getTitleInput();
    //updating input in data storage
    const updatedTask = TaskControl.updateDataToStorage(title);
    StorageControl.updateTask(updatedTask);
    //clear frome feild
    ui.clearField();
    //clear edit state
    UiControl.clearEditState();
    //get task
    const tasks = TaskControl.getTask();
    //show updatedTask in the ui
    ui.populateTask(tasks);
    //showing masage
    ui.showMsg("your task has been updated", "success");
  }

  //deleting task frome data and ui
  function deleteTask(e) {
    //prevent default action
    e.preventDefault();
    // get currantTask forme data storage
    const currantTask = TaskControl.getCurrateTask();
    //delete currantTask forme data storage
    const deletedTask = TaskControl.deleteTask(currantTask);
    //deleting task frome loacalStorage
    StorageControl.deleteTask(deletedTask);
    //count deliting task
    const totalTask = TaskControl.getTotalTaskCount();
    //show deliting task
    ui.showTotalTaskCount(totalTask);
    //count deliting completedTask
    const completdTaskCoutn = TaskControl.getCompletedTaskCount();
    //show deliting completedTask in ui
    ui.showCompletedTask(completdTaskCoutn);
    //get task
    const tasks = TaskControl.getTask();
    //show updatedTask in the ui
    ui.populateTask(tasks);
    //clear feild
    ui.clearField();
    //clear edit stae
    ui.clearEditState();
    //showing masage
    ui.showMsg("your task has been deleted", "danger");
  }

  //working with complatedTask button
  function complatedTask(e) {
    if (e.target.id === "complated-task") {
      const id = Number(
        e.target.parentElement.parentElement.parentElement.parentElement.id.split(
          "-"
        )[1]
      );
      //updated completed property in data Storege
      taskData.complateTask(id);
      //gettask by id
      const updatedTask = TaskControl.getTaskbyId(id);

      // save updated task to localStorage
      StorageControl.updateTask(updatedTask);
      //count completedTask
      const completdTaskCoutn = TaskControl.getCompletedTaskCount();

      console.log(completdTaskCoutn);
      //show completedTask in ui
      ui.showCompletedTask(completdTaskCoutn);

      //getting task
      const task = taskData.getTask();
      //update ui agien
      ui.populateTask(task);
    }
  }

  //working with TaskAddSubmit button
  function TaskAddSubmit(e) {
    e.preventDefault();
    const taskTitle = ui.getTitleInput();

    if (taskTitle.trim() === "") {
      // UiControl.showAlert("plz enter a task","warning");
      //showing massage
      ui.showMsg("plz enter a task", "danger");
    } else {
      //update to data storage
      const task = TaskControl.addTask(taskTitle);
      //adding data to loaclStorage
      StorageControl.addTask(task);
      //update to ui
      ui.clearField();
      //update data in ui
      ui.populateTasks(task);
      //update total task count
      const totalTask = TaskControl.getTotalTaskCount();
      ui.showTotalTaskCount(totalTask);
    }
  }

  //working with backBtn button
  function backBtn(e) {
    e.preventDefault();
    if (document.querySelector("#backBtn")) {
      UiControl.clearEditState();
      ui.clearField();
    }
  }

  return {
    init() {
      //getting task form data center
      const task = taskData.getTask();
      //populating task in ui
      UiControl.populateTask(task);
      //getting completed task coutn

      //count total task
      const totalTask = TaskControl.getTotalTaskCount();
      //show total task
      ui.showTotalTaskCount(totalTask);

      //count completedTask
      const completdTaskCoutn = TaskControl.getCompletedTaskCount();
      //show completedTask in ui
      ui.showCompletedTask(completdTaskCoutn);
      //clear state mode
      UiControl.clearEditState();
      //calling event listener
      loadEventListener();
    }
  };
})(TaskControl, UiControl, StorageControl);
AppControl.init();
