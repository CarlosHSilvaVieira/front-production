export interface EmployerInterface {

    Id: number,
    Nome: string,
    Matricula: number,
    Cargo: string,
    Turno: string,
    HorasTrabalhadas: WorkedHours[],

}

export interface WorkedHours {

    Id: number,
    HorasTrabalhadasNoMes: string,
    Mes: number
}
