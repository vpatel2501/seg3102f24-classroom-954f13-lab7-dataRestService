import { Component,OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Book } from 'src/app/books/model/book';
import { Author } from 'src/app/books/model/book';
import { BooksService } from 'src/app/books/service/books.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit, OnDestroy{
  selectedBook!: Author | null;
  private subscription!: Subscription;

  constructor(private route: ActivatedRoute, private booksService: BooksService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.subscription = this.booksService.getAuthor(id).subscribe(
        (data: Author) => {
          this.selectedBook = data;
        },
        (_: any) => {
          this.selectedBook = null;
        });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
