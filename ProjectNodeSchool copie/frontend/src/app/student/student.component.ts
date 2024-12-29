import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { AgGridModule } from 'ag-grid-angular';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Router } from '@angular/router';


ModuleRegistry.registerModules([ClientSideRowModelModule]);

@Component({
  standalone: true,
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  imports: [AgGridModule]
})
export class StudentComponent implements OnInit {
  students: any[] = [];
  columnDefs = [
    { field: 'student_id', headerName: 'Student ID', sortable: true, filter: true },
    { field: 'first_name', headerName: 'First Name', sortable: true, filter: true },
    { field: 'last_name', headerName: 'Last Name', sortable: true, filter: true },
    { field: 'date_of_birth', headerName: 'Date of Birth', sortable: true, filter: true },
    { field: 'current_academic_year', headerName: 'Academic Year', sortable: true, filter: true },
    { field: 'email', headerName: 'Email', sortable: true, filter: true },
    { field: 'major', headerName: 'Major', sortable: true, filter: true },
    { field: 'enrollment_date', headerName: 'Enrollment Date', sortable: true, filter: true }
  ];
  defaultColDef = { flex: 1, minWidth: 100, resizable: true };

  constructor(private http: HttpClient, private router: Router) {
    console.log('StudentComponent loaded');
  }

  ngOnInit(): void {
    this.fetchStudents();
    this.fetchMajorData();
  }

  // Fetch all students for the grid
  fetchStudents(): void {
    this.http.get<any[]>('http://localhost:3000/api/students')
      .subscribe(
        (data) => {
          this.students = data;
        },
        (error) => {
          console.error('Error fetching students:', error);
        }
      );
  }


  // Fetch major distribution data for the pie chart
  fetchMajorData(): void {
    this.http.get<any[]>('http://localhost:3000/api/students/majors')
      .subscribe(
        (data) => {
          this.renderPieChart(data);
        },
        (error) => {
          console.error('Error fetching major data:', error);
        }
      );
  }

  // Render pie chart
  renderPieChart(data: any[]): void {
    const chartData = data.map(item => ({
      name: item.major,
      y: item.student_count
    }));

    console.log("Processed Chart Data:", chartData);

    Highcharts.chart('chartContainer', {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Students Distribution by Major'
      },
      tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b> ({point.y} students)'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Majors',
        data: chartData,
        type: 'pie'
      }]
    });
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    this.router.navigate(['/auth']);
  }

}
