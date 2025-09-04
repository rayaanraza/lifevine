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
  