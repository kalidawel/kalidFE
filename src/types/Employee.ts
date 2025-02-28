export default interface Employee {
    id?: number
    fName: string
    lName: string
    empDepartment: string
    age:number
    email: string
    address: string
    company?:object
}