# 🚘 MEET VROOM. 🚘

Zoom wasn't built for online learning; but for 1.3 billion children, it's now their source of education. According to The United States Census Bureau in 2020, 63% of students felt the quality of online learning was worse than classroom learning.

**That’s where Vroom comes in.**

It's designed to bridge the gap between the screen and the virtual classroom by making it easier to communicate with and get support from your tutors. 

## 😎 How did we do it? 😎
Vroom sounds pretty great, right? One problem: Zoom doesn't have an API to manage live meetings. To get around this, we used a **Selenium bot** to monitor the Zoom chat, which interacts via **Express Node.js** with our **React**-powered **Electron** app. So the student can communicate more comfortably with the teacher on Zoom, and the teacher can better support the student on Vroom. 

## How does it work?
### For students
**🙋‍♂️Ask your Questions Anonymously🤷‍♀️**<br />
Ever felt embarrassed to ask a question in class? With Vroom, just type `!anon` and your question - Vroom will ask it for you.

**🔡Get translations in real time🔣**<br />
27% of Australian students have English as a second language, so it can be hard for them to keep up. With Vroom, you can translate to English directly in the chat. 

**🚀Let your tutor know they're going too slowly or that you need help - embarrassment free.🚀**<br />
Using the `!slower`, `!faster`, and `!help` commands, students can tell the tutor to drop or pick up the pace or get help without the publicity - only the tutor can see the message. 

### For Tutors
**📈Track your Students' Progress📉**<br />
With the `!progress` command, teachers can see what students are working on, allowing them to pace lessons accordingly. On the student end, they can share this important information with clogging up the chat. 

📊**Build and Monitor Polls**📊<br />
Vroom allows tutors to send poll questions to the chat, and collect student responses in the chat using the `!vote` command. This streamlines the polling process and makes it easier than ever before for students to participate. 

**📋Build and View Lesson Plans📋**<br />
Teachers can create new plans for lessons, including topics and allocated times, all in Vroom! They can also import existing plans into the app. 

Plus some other handy features:
- `!now` - *find out where the class is up to in the lesson plan*
- `!attend` - *get the zoom meeting attendance list*
- `!commands` - *get a list of the all the commands available in Vroom*


## 👾 Who else would use it? 👽
By 2025, the online education market is projected to be worth around $325 billion! (Chernev, 2021)  <br/>
Our main audience is students, teachers, and tutors, but Vroom doesn't stop there - here are some other ways Vroom can assist:<br />
    1 . Conducting votes on agenda items or motions in business meetings anonymously - over 40% of Fortune 500 companies use it to train their staff (Chernev, 2021) <br />
    2 . Tracking progress on tasks in meetings <br />
    3 . Helping cross-cultural teams achieve more with the in-chat translation feature <br />

## 🧮 Our Stack 🧮
- **React** for the frontend
- **Bootstrap** for frontend styling
- **Electron** to create a desktop application
- **Express.js** to manage the local backend
- **Selenium** to interact with the Zoom Web Client
- **Google Translate API** to translate messages

## Our Bloopers
- **10:21pm, Saturday**: Zoom rolls out an update to their UI, so Vroom can't timestamp the requests properly anymore <br/> 🤠🙃

## How to Run

+ Clone the repository and run `npm i` to install dependencies
+ If on Windows, run `npm run dev` to launch a complete version of the application
+ If on Mac or Linux, run `npm run dev-mac` to launch a complete version of the application

## How to Run in Test Modes

+ Clone the repository and run `npm i` to install dependencies
+ If on Windows, run `npm run dev-test` to launch the application with a dummy backend
+ If on Mac or Linux, run `npm run dev-mac-test` to launch the application with a dummy backend
+ For all platforms, run `npm run backend` to launch only the backend and selenium

## Authors
+ Sammi Millett
+ Lilian Hunt
+ Rhiannon Hames
+ Andrew Esteban