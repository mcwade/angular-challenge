import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingPipe } from './loading.pipe';

@NgModule({
   imports: [CommonModule],
   declarations: [LoadingPipe],
   exports: [LoadingPipe, CommonModule]
})
export class SharedModule { }
