function saveTutorSubjectSearchesToLocalStorage(subjects) {
    localStorage.setItem('tutorSubjectSearches', JSON.stringify(subjects));
}

function saveTutorResultsToLocalStorage(tutorResults) {
    console.log('saved tutors to ls')
    localStorage.setItem('tutorResults', JSON.stringify(tutorResults)); //local storage only takes strings
}

function saveFailedSearchResultToLocalStorage(subject) {
    localStorage.setItem('failedSearchSubject', JSON.stringify(subject));
}

function saveFirstFormResultsToLocalStorage(chosenMethod) {
    localStorage.setItem('chosenMethod', JSON.stringify(chosenMethod)); 
}

function clearFirstFormResults() {
    localStorage.removeItem('chosenMethod'); //clear local storage
    document.querySelector('#form-2').innerHTML = ''; //wipe old html
}

function clearTutorDisplayResults() {
    localStorage.removeItem('tutorResults');
    localStorage.removeItem('failedSearchSubject');
    document.querySelector('.tutor-display').innerHTML = '';
}

function clearTutorSubjectSearchesFromLocalStorage() {
    localStorage.removeItem('tutorSubjectSearches');
    document.querySelector('.tutor-display').innerHTML = '';
}

function loadFirstFormResultsFromLocalStorage() {
    const savedFirstFormResults = localStorage.getItem('chosenMethod');
    return savedFirstFormResults ? JSON.parse(savedFirstFormResults) : null;
}

function loadTutorSubjectSearchesTitleFromLocalStorage() {
    const savedSearchResult = localStorage.getItem('tutorSubjectSearches');
    return savedSearchResult ? JSON.parse(savedSearchResult) : null;
}

// Function to load tutor results from local storage
function loadTutorResultsFromLocalStorage() {
    console.log('loaded tutors from ls');
    const savedTutorResults = localStorage.getItem('tutorResults'); 
    return savedTutorResults ? JSON.parse(savedTutorResults) : null; //ternary expression, returns the tutor results if there is a saved value, returns null if not
}

function loadFailedSearchResultFromLocalStorage() {
    const savedFailedSearchResults = localStorage.getItem('failedSearchSubject');
    return savedFailedSearchResults ? JSON.parse(savedFailedSearchResults) : null;
}

function loadChosenMethodFromLocalStoarge() {
    const savedChosenMethod = localStorage.getItem('chosenMethod');
    return savedChosenMethod ? JSON.parse(savedChosenMethod) : null;
}

//these four allow the user to refresh the page and the stuff is still there but when they leave it it's gone
document.querySelector('.js-logo-button').addEventListener('click', () => {
    clearFirstFormResults();
    clearTutorSubjectSearchesFromLocalStorage();
    clearTutorDisplayResults();
});
document.querySelector('.js-schedule-button').addEventListener('click', () => {
    clearFirstFormResults();
    clearTutorSubjectSearchesFromLocalStorage();
    clearTutorDisplayResults();
});
document.querySelector('.js-tutors-button').addEventListener('click', () => {
    clearFirstFormResults();
    clearTutorSubjectSearchesFromLocalStorage();
    clearTutorDisplayResults();
});
document.querySelector('.js-sign-up-button').addEventListener('click', () => {
    clearFirstFormResults();
    clearTutorSubjectSearchesFromLocalStorage();
    clearTutorDisplayResults();
});

function displaySubjects() { 
    let result = '';

    subjectList.forEach((subject, index) => {
        
        result += `
            
            <label for = 'inp-${index}'>
                <input type="checkbox" id = 'inp-${index}' name="inp" value="${subject}">${subject}</input>
            </label>
            
        `;
    });

    return result;
}

function renderFormHTML(chosenMethod) {
    if (chosenMethod === 'Name') {
        document.querySelector('#form-2').innerHTML = `
            <div class = 'divider'></div>
            <div class = 'form-box'>
                <p class = 'tutor-search-question'>
                    Please enter the full name of your tutor. Be sure to spell their name correctly.
                </p>
                <input type = 'text' class = 'js-name-input name-input' placeholder = 'Enter name'>
                <button class = 'js-submit-name-button submit-button'>Submit</button>
            </div>
        `;
    } else {
        document.querySelector('#form-2').innerHTML = `
            <div class = 'divider'></div>
            <div class = 'form-box'>
                <div class = 'form-control'>
                    <p class = 'tutor-search-question'>
                        What Subjects are you Seeking Help With? Check all that Apply.
                    </p>

                    <div class = 'form-input-box subject-input-box'>${displaySubjects()}</div>
                </div>

                <div class = 'form-control'>
                    <p class = 'tutor-search-question'>
                        Would You Prefer Meeting in Person or Online?
                    </p>

                    <div class = 'form-input-box'>
                        <!-- Input Type Radio Button -->
                        <label for="recommend-2-1">
                            <input type="radio" id = "recommend-2-1" name = 'recommend-2' value = 'In Person'>In Person</input>
                        </label>
                        <label for="recommend-2-2">
                            <input type="radio" id = "recommend-2-2" name = 'recommend-2' value = 'Online'>Online</input>
                        </label>
                        <label for="recommend-2-3">
                            <input type="radio" id = "recommend-2-3" name = 'recommend-2' value = 'Either'>Either</input>
                        </label>
                    </div>
                </div>

                <button class='js-submit-subject-button submit-button' type="button">Submit</button>
            </div>
        `;
    }
}

function extractSubjectFormData() {
        // Get form elements by their IDs
        const subjects = document.querySelectorAll('input[name="inp"]:checked');
        const preferredOption = document.querySelector('input[name="recommend-2"]:checked');

        // Extract selected subjects
        const selectedSubjects = Array.from(subjects).map(subject => subject.value);

        // Extract preferred option
        const preferredChoice = preferredOption ? preferredOption.value : '';

        // Print the extracted data (you can do anything you want with the data at this point)
        // console.log('Selected Subjects:', selectedSubjects);
        // console.log('Preferred Option:', preferredChoice);

        return [selectedSubjects, preferredChoice];
}

function findTutorsByName(inputName) {
    const tutorNameResults = [];

    tutorList.forEach((tutor) => {
        if(tutor.name.split(" ").join("").toLowerCase() === inputName) {
            tutorNameResults.push(tutor);
        }
    });

    return tutorNameResults;
}

function findTutorsBySubject(userSubject, userPrefferedLocation) {
    let tutorSubjectResults = [];
    // console.log(`user subject ${userSubject}`);
    // console.log(`user preferred loc ${userPrefferedLocation}`);

    for(let j = 0; j < tutorList.length; j++) { //looping through the tutors
        
        for(let k = 0; k < tutorList[j].subjectList.length; k++) { //looping through the tutors available subjects
            //console.log(`tutor name ${tutorList[j].name}, tutor current subject ${tutorList[j].subjectList[k]}, tutor preffered loc ${tutorList[j].meetingPreference}`);
            
            if(tutorList[j].meetingPreference === 'Either' || userPrefferedLocation === 'Either') {
                if(userSubject === tutorList[j].subjectList[k]) tutorSubjectResults.push(tutorList[j]);
            } else {
                if(userSubject === tutorList[j].subjectList[k] &&
                    userPrefferedLocation === tutorList[j].meetingPreference) tutorSubjectResults.push(tutorList[j]);
            }
        }
    }

    return tutorSubjectResults;
}

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

function displayTutorNameSearchTitle() {
    document.querySelector('.tutor-display').innerHTML += `
        <div class = 'subject-search-title'>
            Here are your results:
        </div>
        <div class = 'divider-2'></div>
    `;  
}

function displayTutorSubjectSearchTitle(subject) {
    document.querySelector('.tutor-display').innerHTML += `
        <div class = 'subject-search-title'>
            Here are the tutors we found for ${subject}, based off your criteria:
        </div>
        <div class = 'divider-2'></div>
    `;
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

function displayFailedTutorSearchBySubject(subject) {
    document.querySelector('.tutor-display').innerHTML += `
        <div class = 'subject-search-title'>
            We did not find any tutors for ${subject} based off your criteria. Please consider changing your meeting preference.
        </div>
    `;
}

let chosenMethod;
document.querySelector('.js-submit-button-1').addEventListener('click', (event) => { //seeing if the first form submit button is clicked
    event.preventDefault();

    if(document.querySelector('.tutor-display').innerHTML) { //removes any tutor results when changing search method
        document.querySelector('.tutor-display').innerHTML = '';
    }
    const searchMethod = document.querySelector('input[name="recommend-1"]:checked');
    chosenMethod = searchMethod ? searchMethod.value : '';

    renderFormHTML(chosenMethod);
    saveFirstFormResultsToLocalStorage(chosenMethod);
});

const tutorsByName = []; //needs to be outside so that you can add people to the search results
document.querySelector('.main').addEventListener('click', (event) => { //seeing if the name form submit button is clicked
    if(event.target.classList.contains('js-submit-name-button')) {
        event.preventDefault();
        document.querySelector('.tutor-display').innerHTML = ''; //clear previous suggestions

        const nameInputElement = document.querySelector('.js-name-input');
        const nameInput = nameInputElement.value.split(" ").join("").toLowerCase();

        nameInputElement.value = ''; //resets the text box

        const tutorResults = findTutorsByName(nameInput);
        tutorResults.forEach((tutor) => {
            tutorsByName.push(tutor);
        });
        console.log(tutorsByName);

        displayTutorNameSearchTitle();
        displayTutors(tutorsByName);
        saveTutorResultsToLocalStorage(tutorsByName);
    }
});

const tutorsBySubject = [];
document.querySelector('.main').addEventListener('click', (event) => { //seeing if the subject form submit button is clicked
    if(event.target.classList.contains('js-submit-subject-button')) {
        event.preventDefault();
        clearTutorDisplayResults(); //removes any previous tutor results
        
        const formResults = extractSubjectFormData();
        const chosenLocation = formResults[1];
        console.log(typeof formResults);

        formResults[0].forEach((subject, index) => { //looping through each subject

            tutorsBySubject.push(findTutorsBySubject(subject, chosenLocation));
            if(tutorsBySubject[index].length === 0) {
                displayFailedTutorSearchBySubject(subject);
                saveFailedSearchResultToLocalStorage(subject);
            } else if(index < (formResults[0].length - 1) && formResults[0].length > tutorsBySubject[index].length && index === (formResults[0].length - 1)) {
                displayFailedTutorSearchBySubject(subject);
                saveFailedSearchResultToLocalStorage(subject);
            } else {
                displayTutorSubjectSearchTitle(subject);
                saveTutorSubjectSearchesToLocalStorage(formResults[0]);
                displayTutors(tutorsBySubject[index]);
                saveTutorResultsToLocalStorage(tutorsBySubject);
            }
        });
        
        document.getElementById('form-2').reset(); //resets users selections in the form
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Load tutor results from local storage if available
    const savedFirstFormResults = loadFirstFormResultsFromLocalStorage();
    if(savedFirstFormResults) {
        renderFormHTML(savedFirstFormResults);
    }

    const chosenSearchMethod = loadChosenMethodFromLocalStoarge();

    if(chosenSearchMethod) {
        if(chosenSearchMethod === 'Name') {
            const savedTutorResults = loadTutorResultsFromLocalStorage();
            if(savedTutorResults) {
                displayTutorNameSearchTitle();
                displayTutors(savedTutorResults);
            }

        } else if(chosenSearchMethod === 'Subject') {

            const savedSearchSubjectResults = loadTutorSubjectSearchesTitleFromLocalStorage();
            console.log(savedSearchSubjectResults);
            if(savedSearchSubjectResults) {
                
                savedSearchSubjectResults.forEach((subject, index) => {
        
                    const savedTutorResults = loadTutorResultsFromLocalStorage();
                    if(savedTutorResults[index]) {
                        displayTutorSearchTitle(subject);
                        console.log(savedTutorResults[index]);
                        displayTutors(savedTutorResults[index]);
                    } else {
                        const savedFailedSearchSubject = loadFailedSearchResultFromLocalStorage();
                        if(savedFailedSearchSubject) {
                            displayFailedTutorSearchBySubject(subject);
                        }
                    }
        
                });
            }
        }
    }
});
