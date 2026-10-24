const gradeForm = document.getElementById("gradeForm");
const studentNameInput = document.getElementById("studentName");
const obtainedMarksInput = document.getElementById("obtainedMarks");
const totalMarksInput = document.getElementById("totalMarks");
const errorMessage = document.getElementById("errorMessage");
const resultCard = document.getElementById("resultCard");
const greeting = document.getElementById("greeting");
const percentageResult = document.getElementById("percentageResult");
const gradeResult = document.getElementById("gradeResult");
const progressBar = document.getElementById("progressBar");
const remarkResult = document.getElementById("remarkResult");
const resetButton = document.getElementById("resetButton");

function getGrade(percentage) {
  if (percentage >= 80) return { grade: "A", remark: "Excellent work! Keep it up." };
  if (percentage >= 70) return { grade: "B", remark: "Very good! You are doing well." };
  if (percentage >= 60) return { grade: "C", remark: "Good effort. Keep practicing." };
  if (percentage >= 50) return { grade: "D", remark: "You passed. You can improve further." };
  return { grade: "F", remark: "Keep studying and try again. You can improve." };
}

gradeForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const obtainedMarks = Number(obtainedMarksInput.value);
  const totalMarks = Number(totalMarksInput.value);

  errorMessage.classList.add("hidden");
  errorMessage.textContent = "";

  if (obtainedMarksInput.value.trim() === "" || totalMarksInput.value.trim() === "") {
    showError("Please enter both obtained marks and total marks.");
    return;
  }

  if (!Number.isFinite(obtainedMarks) || !Number.isFinite(totalMarks) ||
      obtainedMarks < 0 || totalMarks <= 0) {
    showError("Marks must be valid numbers. Total marks must be greater than 0.");
    return;
  }

  if (obtainedMarks > totalMarks) {
    showError("Obtained marks cannot be greater than total marks.");
    return;
  }

  const percentage = (obtainedMarks / totalMarks) * 100;
  const result = getGrade(percentage);
  const studentName = studentNameInput.value.trim();

  greeting.textContent = studentName ? `Result for ${studentName}` : "Your result";
  percentageResult.textContent = `${percentage.toFixed(2)}%`;
  gradeResult.textContent = result.grade;
  progressBar.style.width = `${percentage}%`;
  remarkResult.textContent = result.remark;
  resultCard.classList.remove("hidden");
});

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
  resultCard.classList.add("hidden");
}

resetButton.addEventListener("click", function () {
  gradeForm.reset();
  totalMarksInput.value = "500";
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
  resultCard.classList.add("hidden");
  progressBar.style.width = "0%";
  obtainedMarksInput.focus();
});
