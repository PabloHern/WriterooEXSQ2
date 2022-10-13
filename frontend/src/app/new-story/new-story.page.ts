import { Component, NgZone, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { StoryService } from '../services/story.service';
import { Location } from '@angular/common'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhotoService } from '../services/photo.service';
@Component({
  selector: 'app-new-story',
  templateUrl: './new-story.page.html',
  styleUrls: ['./new-story.page.scss'],
})
export class NewStoryPage implements OnInit {

  storyForm: FormGroup;
  maxChar = 2000;
  textValue = '';
  isSubmitted: boolean = false;
  capturedPhoto: string = "";
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private photoService: PhotoService,
    private storyService: StoryService,
    private location: Location
  ) { }
  ionViewWillEnter() {
    this.storyForm.reset();
    this.isSubmitted = false;
    this.capturedPhoto = "";
  }
  ngOnInit() {
    this.storyForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    })
    this.textValue = '';
  }
  get errorControl() {
    return this.storyForm.controls;
  }
  goBack(): void {
    this.location.back()
  }
  takePhoto() {
    // DECOMMENT:
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }
  pickImage() {
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    this.capturedPhoto = null;
  }

  async onSubmit() {
    this.isSubmitted = true;
    if (!this.storyForm.valid) {
      return false;
    } else {
      let blob = null;
      if (this.capturedPhoto != "") {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }

      this.storyService.createStory(this.storyForm.value, blob)
        .subscribe((response) => {
          console.log("Photo sent");
          this.goBack();
        });
    }
  }
}
