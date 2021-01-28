window.onload = () => {
  let targetedProcess;
  UiPathRobot.init(10);
  UiPathRobot.getProcesses().then((processes) => {
    if (processes.length === 0) {
      showError(
        "Robot not connected to Orchestrator or no processes are available"
      );
    }
    targetedProcess = processes.find((p) => p.name.includes("Amazon"));
    if (targetedProcess) {
      console.log("Process is available");
    } else {
      showError("targetedProcess not found");
    }
  });
  const runProcess = () => {
    let arguments = {
      argument1in: document.querySelector("#item_1").value,
      argument2in: document.querySelector("#item_2").value,
      argument3in: document.querySelector("#item_3").value,
    };
    targetedProcess.start(arguments).then(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  document.querySelector("#ppe_frm").addEventListener("submit", (event) => {
    event.preventDefault();
    runProcess();
  });
};
