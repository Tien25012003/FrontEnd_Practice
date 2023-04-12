/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateExercise = /* GraphQL */ `
  subscription OnCreateExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onCreateExercise(filter: $filter) {
      id
      title
      url
      topicID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateExercise = /* GraphQL */ `
  subscription OnUpdateExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onUpdateExercise(filter: $filter) {
      id
      title
      url
      topicID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteExercise = /* GraphQL */ `
  subscription OnDeleteExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onDeleteExercise(filter: $filter) {
      id
      title
      url
      topicID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateQuiz = /* GraphQL */ `
  subscription OnCreateQuiz($filter: ModelSubscriptionQuizFilterInput) {
    onCreateQuiz(filter: $filter) {
      id
      QuizQuestions {
        nextToken
        startedAt
      }
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateQuiz = /* GraphQL */ `
  subscription OnUpdateQuiz($filter: ModelSubscriptionQuizFilterInput) {
    onUpdateQuiz(filter: $filter) {
      id
      QuizQuestions {
        nextToken
        startedAt
      }
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteQuiz = /* GraphQL */ `
  subscription OnDeleteQuiz($filter: ModelSubscriptionQuizFilterInput) {
    onDeleteQuiz(filter: $filter) {
      id
      QuizQuestions {
        nextToken
        startedAt
      }
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateQuizQuestion = /* GraphQL */ `
  subscription OnCreateQuizQuestion(
    $filter: ModelSubscriptionQuizQuestionFilterInput
  ) {
    onCreateQuizQuestion(filter: $filter) {
      id
      question
      image
      content
      choices
      correctAnswers
      quizID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateQuizQuestion = /* GraphQL */ `
  subscription OnUpdateQuizQuestion(
    $filter: ModelSubscriptionQuizQuestionFilterInput
  ) {
    onUpdateQuizQuestion(filter: $filter) {
      id
      question
      image
      content
      choices
      correctAnswers
      quizID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteQuizQuestion = /* GraphQL */ `
  subscription OnDeleteQuizQuestion(
    $filter: ModelSubscriptionQuizQuestionFilterInput
  ) {
    onDeleteQuizQuestion(filter: $filter) {
      id
      question
      image
      content
      choices
      correctAnswers
      quizID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateResource = /* GraphQL */ `
  subscription OnCreateResource($filter: ModelSubscriptionResourceFilterInput) {
    onCreateResource(filter: $filter) {
      id
      title
      url
      topicID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateResource = /* GraphQL */ `
  subscription OnUpdateResource($filter: ModelSubscriptionResourceFilterInput) {
    onUpdateResource(filter: $filter) {
      id
      title
      url
      topicID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteResource = /* GraphQL */ `
  subscription OnDeleteResource($filter: ModelSubscriptionResourceFilterInput) {
    onDeleteResource(filter: $filter) {
      id
      title
      url
      topicID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateTopic = /* GraphQL */ `
  subscription OnCreateTopic($filter: ModelSubscriptionTopicFilterInput) {
    onCreateTopic(filter: $filter) {
      id
      title
      icon
      level
      description
      Resources {
        nextToken
        startedAt
      }
      Exercises {
        nextToken
        startedAt
      }
      Quiz {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      topicQuizId
    }
  }
`;
export const onUpdateTopic = /* GraphQL */ `
  subscription OnUpdateTopic($filter: ModelSubscriptionTopicFilterInput) {
    onUpdateTopic(filter: $filter) {
      id
      title
      icon
      level
      description
      Resources {
        nextToken
        startedAt
      }
      Exercises {
        nextToken
        startedAt
      }
      Quiz {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      topicQuizId
    }
  }
`;
export const onDeleteTopic = /* GraphQL */ `
  subscription OnDeleteTopic($filter: ModelSubscriptionTopicFilterInput) {
    onDeleteTopic(filter: $filter) {
      id
      title
      icon
      level
      description
      Resources {
        nextToken
        startedAt
      }
      Exercises {
        nextToken
        startedAt
      }
      Quiz {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      topicQuizId
    }
  }
`;
