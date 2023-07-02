import { Component } from '@angular/core';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  searchbar: string = "";
  movies: any[] = [];
  response: string = "False";
  selectedYear: string = "";
  selectedType: string = "";
  currentPage = 1;
  pageSize = 3;
  constructor(private data: MovieService) {}

  dataMovie() {
    this.data.getData(this.searchbar).subscribe((curr) => {
      this.response = curr.Response;
      this.movies = curr.Search;
      this.searchbar = "";
      this.currentPage = 1;
      console.log(this.movies);
    });
  }
  

  filterByLatestDate() {
    this.movies.sort((a, b) => {
      return parseInt(b.Year, 10) - parseInt(a.Year, 10);
    });
  }
  get totalPages(): number {
    return Math.ceil(this.movies.length / this.pageSize);
  }
  
  get pagedMovies(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.movies.slice(startIndex, endIndex);
  }
  
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  getPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
  
}
