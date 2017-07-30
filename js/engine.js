$( document ).ready(function() {
  var matrix = [
    {
      q: "What is your experience level?",
      a: ["Beginner", "Advanced", "Master"],
      r: null,
    },
    {
      q: "Where do you plant?",
      a: ["Indoor", "Outdoor"],
      r: null,
    },
    {
      q: "What plants do you like?",
      a: ["Herbs", "Vegetables", "Succulents"],
      r: null
    },
  ];

  var suggestions = {
    "Beginner,Indoor,Herbs": "Mint GardenBox",
    "Beginner,Indoor,Vegetables": "Chili Pepper GardenBox",
    "Beginner,Indoor,Succulents": "Beginner Succulents GardenBox",

    "Beginner,Outdoor,Herbs": "Rosemary GardenBox",
    "Beginner,Outdoor,Vegetables": "Squash GardenBox",
    "Beginner,Outdoor,Succulents": "Aloe Vera GardenBox",

    "Advanced,Indoor,Herbs": "Basil GardenBox",
    "Advanced,Indoor,Vegetables": "Lettuce GardenBox",
    "Advanced,Indoor,Succulents": "Advanced Indoor Succulents GardenBox",

    "Advanced,Outdoor,Herbs": "Rosemary GardenBox",
    "Advanced,Outdoor,Vegetables": "Tomato GardenBox",
    "Advanced,Outdoor,Succulents": "Advanced Outdoor Succulents GardenBox",

    "Master,Indoor,Herbs": "Oregano GardenBox",
    "Master,Indoor,Vegetables": "Spinach GardenBox",
    "Master,Indoor,Succulents": "Masters Indoor Succulents GardenBox",

    "Master,Outdoor,Herbs": "Chives GardenBox",
    "Master,Outdoor,Vegetables": "Carrots GardenBox",
    "Master,Outdoor,Succulents": "Masters Outdoor Succulents GardenBox",
  };

  function optionButtonResetClicked(){
    _.each(matrix, (x, i, r) => {
      r.r = null;
    });
    setNextQA(-1);
    $('#suggestion-row').addClass('hidden');
  }

  function setNextQA(index){
    var next = index + 1;
    var next_question = matrix[next].q;
    var next_answers = matrix[next].a;
    setQuestion(next_question);

    hideAnswers();
    _.each(next_answers, (x, i) => {
      setAnswer(x, i + 1);
    });
  }


  function optionButtonClicked(){
    var question = getQuestion();
    var answer = $(this).text();

    var index = _.findIndex(matrix, {q: question});

    matrix[index].r = answer;

    if(index >= (matrix.length -1)){
      setResults();
      return;
    }

    setNextQA(index);
    console.log('option button clicked');
  }

  function getQuestion() {
    return $('#option-question').text();
  }

  function setQuestion(str){
    $('#option-question').text(str);
  }

  function hideAnswers(){
    $('.option-button').addClass('hidden');
  }

  function setAnswer(str, i){
    var button = $(`#option-button-${i}`);
    button.text(str);
    button.removeClass('hidden');
  }

  function setResults(){
    hideAnswers();

    var answers = _.pluck(matrix, 'r').join(',');
    var suggestion = suggestions[answers];
    suggestion = suggestion || "Mystery GardenBox";

    hideAnswers();
    $('#suggestion-row').removeClass('hidden');
    $('#suggestion-label').text(`We'll send you ${suggestion}`);
  }

    $('.option-button').on('click', optionButtonClicked);
    $('.option-button-reset').on('click', optionButtonResetClicked);
    console.log( "ready!" );
});
