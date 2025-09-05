# LifeVine

## Project Description
A software application that gives families an opportunity to document, organize, and preserve their digital history such as their photos, videos, and documents. This application will have two GUIs, a database, and a program to organize and document this information in chronological order. Families often face challenges locating this information because it is scattered across different locations and difficult to access. The app will arrange all media on a timeline, allow families to share selected content with each other, provide options to sort by videos, photos, or documents, and include security features to restrict access to specific people. For each item, the user will be listed and will have the option to add details such as who took the photo or video, the location, the time, and text explaining the reason for the media.  

## Technologies 
- React - used for the graphical user interface
- Firebase- for authentication and secure login
- SQL - used for managing the database

## Tools
- GitHub- location of our source code and the platform for our team to collaborate
- Figma- GUI design
- Visual Studio Code - IDE for coding

## Features
- Timeline (chronological order)
- Dropdown menu for user selection (photos, videos, and documents)
- Each time the user uploads a media they can add details such as who took the photo or video, the location, the time, and text explaining the reason for the media
- Security features to restrict access to specific people
- Searching tool to look up key words and find the photo, video, or document
  
## Goals
- Create a platform that is functional and creates an experience for the users
- A secure and safe application where users have their own account
- Users have the option to restrict access to certain content
- Users will have the ability to organize their media based on preference and share it with their families

## Progress Plan
- Week 1: Meet with our mentor, create a plan for the project, and present our goals to the class.
- Week 2: Meet with our mentor, Set up Github repo, create two unit tests, and complete the README file documentation.
- Week 3-4: Create the login page and registration page. 
- Week 5-6: Meet with our mentor and build the initial database 
- Week 7-8: Continue to work on the database, and create a GUI for file upload   
- Week 9-10: Meet with our mentor, continue to work on the features, and implement privacy features for restrictions
- Week 11: Add features such as search tab and a dropdown for sorting
- Week 12: Meet with our mentor, run tests, and work on the features
- Week 13-15: Incorporate final feedback from our mentor into the app and fix any bugs
- Week 16: Present the final application to Dr. Mansoor Abdulhak, our mentor, and the TA. 

## Authors
- Cristiana Eagen
- Ibrahim Mohammad
- Rayaan Raza
- Cade Ward

## Mentor
- Edward Slief


## React unit test psuedo code
```
// init first photo in state
const [timeline, setTimeline] = useState([
    { key: "09/03/2025", value: "img.src" }
  ]);
  
  // new photo
  let photo2 = { key: "11/04/2025", value: "img.src" };
  
  // == TEST ==
  // attempt to add photo and keep timeline sorted
  setTimeline(prev => {
    let next = [...prev, photo2];
    next.sort((a, b) => new Date(a.key) - new Date(b.key));
    return next;
  });
  
  // check that photo2 is in correct chronological order
  let currentIndex = timeline.findIndex(p => p.key === photo2.key);
  let prevIndex = currentIndex - 1;
  
  if (new Date(timeline[prevIndex].key) < new Date(timeline[currentIndex].key)) {
    return true;
  }
  
```

## JavaScript Unit Test and Psuedo Code
// initialize the first photo 
let rootPhoto = {
    key: '09/03/2025', value: 'img.src',
}
// init the timeline and add first chronological image
let timeline = [rootPhoto]

let photo2 = {
    key: '11/04/2025', value: 'img.src',
}

// == TEST == 
// goal: ensure that photos are displayed chronologially in the timeline

// 1) attempt to add a new photo
timeline.add(photo2)

// 2) grab index of current and previous element
current_index = timeline.find(photo2)
prev_index = current_index - 1

// 3) compare the previous index's date and current indexes date
//    if chronological, return true.
if (timeline[prev_index.key()] < timeline[current_index.key()]){
    return true;
}

## Python Unit Test and Psuedo Code
import datetime as dt
import pytest

# ^^ going to be replaced by actual imports in the future

class TimelineEntry:
    def __intit__(self, entry_id, person_id, media_id, position_ts):
        self.entry_id = entry_id
        self.person_id = person_id
        self.media_id = media_id
        self.position_ts = position_ts


class InMemoryTimelineService:
    def __init__(self):
        self.entries = []
        self.next_id = 1

    def add_timeline_entry(self, person_id, media_id, position_ts):
        entry = TimelineEntry(self._next_id, person_id, media_id, position_ts)
        self._next_id += 1
        self._entries.append(entry)
        return entry

    def list_timeline(self, person_id):
        return sorted(
            [e for e in self._entries if e.person_id == person_id],
            key=lambda e: e.position_ts
        )

    @pytest.fixture()
    def timeline_service(self):
        return InMemoryTimelineService()

    def test_timeline_is_always_chronological(timeline_service):
        pid = 1
        # Add out-of-order dates: 2021, 2019, 2023
        t1 = dt.datetime(2021, 5, 1)
        t2 = dt.datetime(2019, 1, 1)
        t3 = dt.datetime(2023, 12, 31)

        timeline_service.add_timeline_entry(pid, media_id=1, position_ts=t1)
        timeline_service.add_timeline_entry(pid, media_id=2, position_ts=t2)
        timeline_service.add_timeline_entry(pid, media_id=3, position_ts=t3)

        entries = timeline_service.list_timeline(pid)

        # Extract just the timestamps
        times = [e.position_ts for e in entries]

        # Assert that the returned list is sorted ascending
        assert times == sorted(times), "Timeline is not in chronological order"

        # Also check expected order of media_ids
        assert [e.media_id for e in entries] == [2, 1, 3]