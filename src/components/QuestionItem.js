// import React from "react";

// function QuestionItem({ question }) {
//   const { id, prompt, answers, correctIndex } = question;

//   const options = answers.map((answer, index) => (
//     <option key={index} value={index}>
//       {answer}
//     </option>
//   ));

//   return (
//     <li>
//       <h4>Question {id}</h4>
//       <h5>Prompt: {prompt}</h5>
//       <label>
//         Correct Answer:
//         <select defaultValue={correctIndex}>{options}</select>
//       </label>
//       <button>Delete Question</button>
//     </li>
//   );
// }

// export default QuestionItem; Original code



import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          onDeleteQuestion(question.id);
        } else {
          console.error('Failed to delete');
        }
      })
      .catch(e => console.error(e));
  }

  function handleCorrectAnswerChange(e) {
    const newCorrectIndex = parseInt(e.target.value);
    const updatedQuestion = { ...question, correctIndex: newCorrectIndex };
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex })
    })
      .then(res => res.json())
      .then(() => onUpdateQuestion(updatedQuestion))
      .catch(e => console.error(e));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          defaultValue={correctIndex}
          onChange={handleCorrectAnswerChange}
        >
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

