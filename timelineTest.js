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
