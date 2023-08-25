function getTutorAge(tutorID) {
    const currentDate = new Date();
    let age;

    tutorList.forEach((tutor) => {

        if(tutorID === tutor.id) {
            age = currentDate.getFullYear() - tutor.birthday.year;

            const currentMonth = currentDate.getMonth();
            const birthMonth = tutor.birthday.month;
            const currentDay = tutor.birthday.day;
            if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < currentDay)) {
                age--; // Subtract 1 year if the birth date has not occurred yet this year
              }
        }
    });

    return age;
}

function printTutorSubjects(tutorID) {
    let result = '';

    tutorList.forEach((tutor) => {

        if(tutorID === tutor.id) {

            if(tutor.subjectList.length === 1) result += `${tutor.subjectList[0]}`;
            else if(tutor.subjectList.length === 2) {
                result += `${tutor.subjectList[0]} and ${tutor.subjectList[1]}`;
            } else {
                for(let i = 0; i < tutor.subjectList.length; i++) {
                    if(i === (tutor.subjectList.length - 1)) {
                        result += ` and ${tutor.subjectList[i]}`;
                    } else {
                        result += `${tutor.subjectList[i]}, `;
                    }
                    
                }

            }
        }
    });

    return result;
}

function displayTutors(tutors) {

    tutors.forEach((tutor) => {
        document.querySelector('.tutor-display').innerHTML += `
            <div class = 'single-tutor-display'>
                <div class = 'tutor-image-box'>
                    <img class = 'tutor-image' src = 'images/${tutor.imgName}'>
                </div>

                <div class = 'vert-divider'></div>
                <div class 'tutor-info'>
                    <div class = 'tutor-name'>${tutor.name}</div>
                    <div class = 'tutor-email'>${tutor.email}</div>
                    <div class = 'tutor-age'>${getTutorAge(tutor.id)} years old</div>
                    <div class = 'tutor-subjects-title'>${tutor.name.split(" ")[0]} offers support in the following classes:</div>
                    <div class = 'tutor-subjects-body'>${printTutorSubjects(tutor.id)}</div>
                    <div class = 'tutor-bio-title'>A little bit about ${tutor.name.split(" ")[0]}:</div>
                    <div class = 'tutor-bio-body'>${tutor.bio}</div>
                    <div class = 'tutor-availability-title'>${tutor.name.split(" ")[0]}'s general availability:</div>
                    <div class = 'tutor-availability-body'>${tutor.availabilityBio}</div>
                </div>
            </div>
            <div class = 'divider-box'>
                <div class = 'divider-4'></div>
                <div class = 'divider-3'></div>
                <div class = 'divider-4'></div>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', () => {

    displayTutors(tutorList);
});