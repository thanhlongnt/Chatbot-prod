const data = {
    message: "Hello! I am debugging chatbot. Please describe your bug, and I'll try to help by giving debugging stratergies",
};

const test_case_minimize = {
    title: "Strategy #1: Test Case Minimization",
    explanation: "Test Case Minimization involves simplifying a test case to include only the essential elements needed to reproduce a specific bug. This process helps in identifying the exact conditions under which a bug manifests, thereby making the debugging process more efficient. In software testing, particularly in debugging, it's crucial to isolate the problem quickly and efficiently. By minimizing the test case, testers remove any superfluous inputs, configurations, or steps that do not contribute to the occurrence of the bug. This not only clarifies the root cause but also saves time and resources during the testing phase.",
    example: "Imagine you're developing a mobile app for your college to track class schedules and you encounter a bug that causes the app to crash when trying to load the schedule. Initially, your test case might include various user actions like logging in, navigating through different menus, and performing background updates. To minimize the test case, you would strip away all actions except for loading the schedule, ensuring that the crash occurs solely during this action and not due to any other interference.",
    codingExample: `Here’s a simple Python script that demonstrates test case minimization using a hypothetical function load_schedule() which is known to crash 
              under certain conditions:

              def test_load_schedule():
                  # Initial test case with multiple actions
                  login(user="test_user")
                  navigate_to("Schedule")
                  background_update()
                  assert load_schedule() == "Success", "Schedule loading failed"

              # Minimized test case
              def minimized_test_case():
                  # Removed all actions except the essential one
                  assert load_schedule() == "Success", "Schedule loading failed - potential bug found"

              In this script, minimized_test_case() focuses solely on the action suspected of causing the crash, providing a clear pathway to identifying and 
              fixing the bug.`,
    additions: "Utilize automated reduction tools or techniques such as delta debugging which systematically reduce the input data to find the minimal test case that still produces the bug."
}

const getTestCaseMinimization = {
    get title() {
        return test_case_minimize.title;
    },
    get explanation(){
        return test_case_minimize.explanation;
    },
    get example(){
        return test_case_minimize.example;
    },
    get codingExample(){
        return test_case_minimize.codingExample;
    },
    get additions(){
        return test_case_minimize.additions;
    }

};

const test_case_narrowing = {
    title: "Strategy #2: Narrowing Down the Responsible Code",
    explanation: "This strategy focuses on identifying the specific part of the code responsible for a bug by substituting complex parts of the application with simpler, more controllable implementations. This can include using mock objects or simpler versions of modules to test hypotheses about where defects might be located. By isolating different components or functionalities, developers can more precisely pinpoint the source of problems without the interference of external system complexities. In complex software systems, bugs can arise from interactions between multiple components. By simplifying or mocking certain parts of the system, you reduce the number of interacting variables and clarify the conditions under which bugs appear.",
    example: "Suppose you're working on a group project to develop a student portal where users can sign up for courses and receive updates on class schedules. The system integrates with a third-party calendar service, but updates to the calendar are not processing correctly. Instead of testing with the actual service, which can be time-consuming and unreliable (due to network issues or service downtime), you could use a mock service that simulates the API responses. This allows you to test whether the problem lies in the API integration or within your own scheduling logic.",
    additions: "Implementing conditional debugging along with mock objects allows for detailed logging or breakpoints only under specific conditions, such as when an unexpected type of data is returned. This reduces the volume of logging data and helps focus attention on potential anomalies or bugs, making debugging efforts more efficient and less cluttered.",
    codingExample: `def fetch_calendar_updates():
  # Simulated function that fetches updates from a third-party calendar service
  try:
      # Here we use a mock object instead of the actual API call
      response = mock_calendar_api.get_updates()
      assert response.status_code == 200
      return response.data
  except AssertionError:
      return "API call failed, response status: " + str(response.status_code)

class mock_calendar_api:
  @staticmethod
  def get_updates():
      # This mock simulates a successful API call returning expected data
      class Response:
          def __init__(self):
              self.status_code = 200
              self.data = {"message": "Here are your calendar updates", "items": ["Math Class at 10 AM", "Physics Class at 2 PM"]}
      return Response()

# Usage of the function with a mock
calendar_updates = fetch_calendar_updates()
print(calendar_updates)`
};

const getNarrowingResponsibleCode = {
    get title() {
        return test_case_narrowing.title;
    },
    get explanation() {
        return test_case_narrowing.explanation;
    },
    get example() {
        return test_case_narrowing.example;
    },
    get additions() {
        return test_case_narrowing.additions;
    },
    get codingExample() {
        return test_case_narrowing.codingExample;
    }
};

const regression_testing = {
    title: "Strategy #3: Regression Testing",
    explanation: "Regression testing is a critical part of the software development lifecycle, aimed at ensuring that recent changes or additions haven't adversely affected the existing functionality of the system. This type of testing is crucial whenever software is updated, to ensure that new code integrates seamlessly without disrupting the operational stability of the application. It involves re-running functional and non-functional tests to guarantee that previously developed and tested software still performs after a change.",
    example: "Imagine you and your team are developing a project management tool for your software engineering class. This tool allows students to track their project milestones and deadlines. After adding a new feature that sends email notifications about upcoming deadlines, you notice that the milestone tracking feature stops working. To identify the commit that caused this issue, you could use git bisect to perform a binary search through your commit history, isolating the problematic change quickly.",
    additions: "For a more realistic implementation, students can set up a script that interacts with their version control system to automate regression tests whenever new commits are pushed to the repository. This ensures that any regressions are caught immediately, making the debugging process more efficient and less error-prone.",
    codingExample: `# Mock function to represent test cases for the project management tool
def test_project_management_app():
  assert milestone_tracking_works(), "Milestone tracking failed!"
  assert email_notifications_work(), "Email notification failed!"

# Simulated function to mimic the behavior of git bisect
def git_bisect_good():
  print("This commit is good.")

def git_bisect_bad():
  print("This commit is bad.")

# Example of using git bisect to find a problematic commit
def find_regression():
  # Starting the bisect session
  commits = [git_bisect_good, git_bisect_bad, git_bisect_good, git_bisect_bad, git_bisect_good]
  for test in commits:
      result = test()
      if "bad" in result:
          print("Regression found:", test.__name__)
          break

# Function to simulate the status of project features
def milestone_tracking_works():
  return True  # Change to False if the feature is broken

def email_notifications_work():
  return False  # Simulate a failure in email notifications

# Running the simulated git bisect test
find_regression()`
};

const getRegressionTesting = {
    get title() {
        return regression_testing.title;
    },
    get explanation() {
        return regression_testing.explanation;
    },
    get example() {
        return regression_testing.example;
    },
    get additions() {
        return regression_testing.additions;
    },
    get codingExample() {
        return regression_testing.codingExample;
    }
};

const bad_state = {
    title: "Strategy #4: Bad State",
    explanation: "The Bad State strategy focuses on identifying and resolving erroneous application states by strategically placing assertions within the code. This method helps in debugging by confirming whether the state of the application aligns with expected outcomes at critical points. By using assertions, developers can quickly identify when and where the state deviates from its intended path, which is particularly useful in debugging complex interactions within the application.",
    example: "Consider a college student building a course registration system where students can sign up for classes. An essential feature is ensuring that a student does not enroll in overlapping classes. The Bad State strategy can be applied by placing assertions to check the timetable for conflicts every time a new class is added to a student's schedule.",
    additions: "To further refine the debugging process, developers can integrate state monitoring and visualization tools. These tools can provide a graphical representation of the state transitions, which can be incredibly insightful in understanding the behavior of complex systems. For instance, visualizing the course load of a student throughout the day can help in identifying not just overlaps but also unreasonable schedules that could be overlooked by a simple assertion check. This approach helps ensure robust application behavior by providing developers with the tools to anticipate and correct issues before they affect users.",
    codingExample: `// Class representing a course with name, start, and end times
class Course {
  constructor(name, start, end) {
      this.name = name;
      this.start = start;
      this.end = end;
  }
}

// Class representing a student with a name and a list of courses
class Student {
  constructor(name) {
      this.name = name;
      this.courses = [];
  }

  // Method to add a course to the student's schedule with conflict checking
  addCourse(newCourse) {
      this.courses.forEach(course => {
          if (course.start < newCourse.end && newCourse.start < course.end) {
              throw new Error(\`Course time conflict: \${newCourse.name} overlaps with \${course.name}\`);
          }
      });
      this.courses.push(newCourse);
  }
}

// Example usage:
try {
  const john = new Student("John Doe");
  const math = new Course("Mathematics", 9, 11);
  const physics = new Course("Physics", 10, 12); // This should throw an error due to time conflict with Math class
  john.addCourse(math);
  john.addCourse(physics);
} catch (error) {
  console.log("Failed to add course:", error.message);
}`
};

const getBadState = {
    get title() {
        return bad_state.title;
    },
    get explanation() {
        return bad_state.explanation;
    },
    get example() {
        return bad_state.example;
    },
    get additions() {
        return bad_state.additions;
    },
    get codingExample() {
        return bad_state.codingExample;
    }
};

const test_case_identify_relative_code = {
    title: "Strategy #5: “Identify Relative Code and State”",
    explanation: "This debugging strategy involves a systematic approach where developers first isolate the part of the codebase relevant to the reported issue. By searching for keywords related to the functionality, adding breakpoints, and tracing through the execution, developers can identify where the code deviates from expected behavior. This method allows for pinpointing specific areas within the codebase that could be causing issues, making it easier to address complex bugs in large systems.",
    example: `Description of the debugging scenario:
A college student is developing an app to manage study groups within a university.
The app allows students to create, join, and schedule meetings for study groups.
However, a bug has been reported: the app crashes whenever a user tries to join a specific group.

Debugging steps:
1. Search the codebase for keywords related to 'joinGroup' or similar functions.
2. Set breakpoints in the functions that handle group membership changes to observe the behavior.
3. Trace the execution to observe how data flows when the crash occurs, checking if any data is unexpected or malformed.`,
    additions: "Utilizing tools like interactive debuggers can greatly enhance this process. For example, using an IDE with a good debugger allows you to set breakpoints and watch variables, which helps in understanding the state of the application at various points. Automated reduction tools like delta debugging can also be instrumental, as they systematically reduce the input data to isolate the minimal test case that still triggers the bug, making the debugging process more efficient.",
    codingExample: `// Define a class to manage study groups
class StudyGroup {
  constructor(members) {
      this.members = members;
  }

  // Method to add a student to the study group
  joinGroup(studentId) {
      console.log(\`Attempting to add student \${studentId} to the group...\`);
      if (typeof studentId !== 'number') {
          throw new Error("Student ID must be an integer");
      }
      this.members.push(studentId);
      console.log(\`Student \${studentId} added to the group.\`);
  }
}

// Function to simulate a student trying to join a group
function simulateJoinGroup() {
  const group = new StudyGroup([123, 456, 789]);
  try {
      let newMember = prompt("Enter the student ID to join the group:");
      newMember = parseInt(newMember); // Convert input to integer
      if (isNaN(newMember)) {
          throw new Error("Invalid input: Student ID must be an integer");
      }
      group.joinGroup(newMember);
  } catch (error) {
      console.error("Failed to join group:", error.message);
  }
}

simulateJoinGroup();`,
};

const getIdentifyRelativeCode = {
    get title() {
        return test_case_identify_relative_code.title;
    },
    get explanation() {
        return test_case_identify_relative_code.explanation;
    },
    get example() {
        return test_case_identify_relative_code.example;
    },
    get codingExample() {
        return test_case_identify_relative_code.codingExample;
    },
    get additions() {
        return test_case_identify_relative_code.additions;
    }
};

const test_case_ask_an_expert = {
    title: "Strategy #6: Ask an Expert",
    explanation: "Consulting with an expert or a more experienced colleague can drastically reduce the time spent on debugging complex issues. Experts may have deeper insights into the architecture, common pitfalls, or specific quirks of the technology stack or codebase you're working with. This strategy leverages their knowledge and experience to guide you through resolving challenging problems more efficiently.",
    example: "Imagine a college student is developing a web application for campus event management as part of their software development class. The app suddenly begins to fail when trying to handle RSVPs for events that exceed the venue capacity. The student, unfamiliar with the error handling in the framework they're using, decides to consult a senior student who has previously worked with the same technology stack.",
    additions: "When consulting an expert, it's essential to come prepared. Outline the problem clearly, share what you've tried, and the results you've obtained. This preparation ensures that the time spent with the expert is productive and focused on finding a solution rather than rehashing basic diagnostics. Using tools like git blame can help identify who last modified certain parts of the code, giving you a starting point for who to consult.",
    codingExample: `// Here’s how you might demonstrate this scenario in code, including comments on where and how an expert might provide insight: JavaScript function to handle RSVPs for events
function handleRSVP(eventId, userId) {
  console.log(\`Handling RSVP for user \${userId} for event \${eventId}\`);
  const event = getEventById(eventId);
  const user = getUserById(userId);

  if (event.guests.includes(userId)) {
      console.error('User has already RSVPed');
      return;
  }

  if (event.guests.length >= event.capacity) {
      console.error('Event capacity reached');
      return;
  }

  event.guests.push(userId);
  console.log('RSVP successful');
}

// Mock functions to simulate database calls
function getEventById(id) {
  // Placeholder function for getting event details
  // Expert insight needed: Optimizing database queries for efficiency
  return { id: id, guests: [], capacity: 50 };
}

function getUserById(id) {
  // Placeholder function for getting user details
  // Expert insight needed: Implementing proper error handling for user not found
  return { id: id, name: 'John Doe' };
}

// Simulating the function call
try {
  handleRSVP(1, 101);
} catch (error) {
  console.error('Failed to handle RSVP:', error);
}`,
};

const getAskAnExpert = {
    get title() {
        return test_case_ask_an_expert.title;
    },
    get explanation() {
        return test_case_ask_an_expert.explanation;
    },
    get example() {
        return test_case_ask_an_expert.example;
    },
    get codingExample() {
        return test_case_ask_an_expert.codingExample;
    },
    get additions() {
        return test_case_ask_an_expert.additions;
    }
};

const test_case_print_statements = {
    title: "Strategy #7: Print Statements",
    explanation: "Using print statements or logging within your code is a fundamental and powerful debugging technique. By strategically placing these statements before and after critical operations, developers can track the flow of data and the progression of program state, which is invaluable for diagnosing issues like race conditions or intermittent bugs. This method allows for real-time observation of how variables and states change over the execution of the program.",
    example: "Imagine a group of college students are working on a collaborative project to develop a real-time online quiz platform. They encounter an issue where sometimes, not all student responses are recorded when multiple students submit answers simultaneously. To debug this, they decide to insert print statements to monitor the sequence of received responses and the updating of the quiz results.",
    additions: "Transitioning to structured logging systems can offer more control over log management, especially in production environments. These systems enable logs to be turned on or off and filtered by severity levels such as debug, info, warn, and error. This approach ensures that developers can capture detailed logs when needed without flooding the system with unnecessary information during normal operations.",
    codingExample: `// Define a function to simulate receiving quiz answers
function receiveAnswer(quizId, studentId, answer) {
  console.log(\`Received answer from student \${studentId}: \${answer}\`);
  const quiz = getQuizById(quizId);
  if (!quiz.answers[studentId]) {
      quiz.answers[studentId] = answer;
      console.log(\`Answer recorded: \${answer} from student \${studentId}\`);
  } else {
      console.warn(\`Duplicate response detected from student \${studentId}\`);
  }
}

// Mock function to simulate getting quiz details
function getQuizById(id) {
  return { id: id, answers: {} }; // A simple object to hold answers
}

// Simulating multiple students submitting answers at the same time
setTimeout(() => { receiveAnswer(1, 101, 'A'); }, 100);
setTimeout(() => { receiveAnswer(1, 102, 'B'); }, 110);
setTimeout(() => { receiveAnswer(1, 101, 'C'); }, 120);  // Simulating a race condition

// Note: In a real application, consider using structured logging with severity levels
// and enable or disable logs dynamically in production environments to optimize performance.`,
};

const getPrintStatements = {
    get title() {
        return test_case_print_statements.title;
    },
    get explanation() {
        return test_case_print_statements.explanation;
    },
    get example() {
        return test_case_print_statements.example;
    },
    get codingExample() {
        return test_case_print_statements.codingExample;
    },
    get additions() {
        return test_case_print_statements.additions;
    }
};
  
  // Expose `getter` to the global scope
  window.getTestCaseMinimization = getTestCaseMinimization;
  window.getNarrowingResponsibleCode = getNarrowingResponsibleCode;
  window.getRegressionTesting = getRegressionTesting;
  window.getBadState = getBadState;
  window.getIdentifyRelativeCode = getIdentifyRelativeCode;
  window.getAskAnExpert = getAskAnExpert;
  window.getPrintStatements = getPrintStatements;
  