// const regExp=/([a-zA-Z]+?):(\d+?) (([a-zA-Z]+)|(\d+)) ?((\d+)|([a-zA-Z]+))/i
//const regExp=/([a-zA-Z]+?)[: -](\d+?) ([a-zA-Z]+) ?(\d+)|(\d+) ?([a-zA-Z]+)/i
//const regExp1=/([a-zA-Z]+?)[: -](\d+?) ([a-zA-Z]+) ?(\d+)/i
//const regExp2=/([a-zA-Z]+?)[: -](\d+?) (\d+) ?([a-zA-Z]+)/i
// reference https://regex101.com/

const regExp1=/([a-zA-Z]+?)([: -]?)(\d+?) ([a-zA-Z]+) ?(\d+)/i
const regExp2=/([a-zA-Z]+?)([: -]?)(\d+?) (\d+) ?([a-zA-Z]+)/i

const SemesterMap = {
    'f': 'fall',
    'w': 'winter',
    's': 'spring',
    'su': 'summer'
}

const errorString = ' Data should be in the format Department:Course Number followed by Year+Semester ex CS:111 2020Fall'
var courseObj = null
var semester
var year

// main method that validates the input string and parse and normalize it
function validateCourse(course) {
     parseInputAndFindCourseValues(course)
     courseObj = Object.assign(courseObj, normalizeYear())
     courseObj = Object.assign(courseObj, normalizeSemester())

     return courseObj
}

// parse the input string using regex and split it into dept, course, semester and year values
function parseInputAndFindCourseValues (course) {
    const match1 = course.match(regExp1)
    const match2 = course.match(regExp2)
    if (match1 == null && match2 == null) {
        throw new Error ('Invalid input string.' + errorString)
    }

    if (match1 != null) {
        department = match1[1],
        course_number = match1[3]
        semester = match1[4]
        year = match1[5]
    }
    else {
        department = match2[1],
        course_number = match2[3]
        semester = match2[4]
        year = match2[5]
    }

    courseObj = {
        department: department,
        course_number: course_number
    }
}


// method to validate and normalize semester value
function normalizeSemester() {
    validateSemester()
    let normalizedSemester = SemesterMap[semester.toLowerCase()] || semester.toLowerCase()
    normalizedSemester = normalizedSemester.charAt(0).toUpperCase() + normalizedSemester.slice(1)
    return {
        semester: normalizedSemester
    }

}

// method to validate semesster value. The value should be the one defined in semestermap
function validateSemester() {
    if (!Object.keys(SemesterMap).includes(semester.toLowerCase()) && 
            !Object.values(SemesterMap).includes(semester.toLowerCase())) {
        throw new Error('Invalid semester. Valid semester values are ' + Object.values(SemesterMap))
    }

}

// Method to validate and normalize year value
function normalizeYear() {
    validateYear()
    return {
        year : getFourDigitYear()
    }

}

// Validate year value. Should not be 3 digit or more than 4 digit
function validateYear() {
    if(year.length > 4) {
        throw new Error('Invalid Year.' + errorString)
    }
    if(year.length == 3) {
        throw new Error('Invalid Year.' + errorString)
    }
}

// get a 4 digit year value. Assuming that we start from year 2000.
function getFourDigitYear() {

    if (year.length === 4)
        return year
    if (year.length === 1) 
        return '200' + year

    return '20' + year
}


// reset all fields in html page
function resetForm() {
    document.getElementById('errorDiv').textContent=' '            
    document.getElementById('department').textContent=' '
    document.getElementById('course_number').textContent=' '
    document.getElementById('semester').textContent=' '
    document.getElementById('year').textContent=' '
}
