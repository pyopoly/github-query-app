import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";


/**
 * Filtering students by their name, which is firstName + lastName.
 * @param {Object[]} students - array of student objects. 
 * @param {string} searchValue - the string to filter the student objects.
 * @returns {Object[]} - returns the filtered array of student objects.
 */
const filterByName = (students, searchValue) => {
    return students.filter(student => 
        student.firstName.toLowerCase().includes(searchValue) || student.lastName.toLowerCase().includes(searchValue))
}

/**
 * Filtering students by their tags. Tags is an array of strings.
 * @param {Object[]} students - array of student objects. 
 * @param {string} searchValue - the string to filter the student objects.
 * @returns {Object[]} - returns the filtered array of student objects.
 */
const filterByTag = (students, searchValue) => {
    if (searchValue === "") return students;
    return students.filter(student => student.tags.some(tag => tag.includes(searchValue)));
}



/****************************
 * SearchBars Component
 ****************************/
const SearchBars = ({ students, setFilteredStudents }) => {
    const [searchName, setSearchName] = useState("")
    const [searchTag, setSearchTag] = useState("")

    // useEffect(() => {
    //     let filtered = filterByName(students, searchName)
    //     filtered = filterByTag(filtered, searchTag)
    //     setFilteredStudents(filtered)
    // }, [searchName, searchTag, setFilteredStudents, students])


    return (
        <div>
            <SearchBar placeholder={"Search by name"} value={searchName} setSearch={setSearchName} />
            {/* <SearchBar placeholder={"Search by tag"} value={searchTag} setSearch={setSearchTag} /> */}
        </div>
    )
}

export default SearchBars