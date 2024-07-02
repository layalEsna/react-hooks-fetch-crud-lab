// import React, { useState } from "react";
// import AdminNavBar from "./AdminNavBar";
// import QuestionForm from "./QuestionForm";
// import QuestionList from "./QuestionList";

// function App() {
//   const [page, setPage] = useState("List");

//   return (
//     <main>
//       <AdminNavBar onChangePage={setPage} />
//       {page === "Form" ? <QuestionForm /> : <QuestionList />}
//     </main>
//   );
// }

// export default App;Original code








import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState("list");

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error(error));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((question) => question.id !== id));
  }

  

  function handleUpdateQuestion(updatedQuestion) {
    setQuestions(questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)));
  }

  return (
    <main>
      <nav>
        <button onClick={() => setView("form")}>New Question</button>
        <button onClick={() => setView("list")}>View Questions</button>
      </nav>
      {view === "form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
          />
          

      )}
    </main>
  );
}

export default App;
