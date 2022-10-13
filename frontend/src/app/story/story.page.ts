import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoryService } from '../services/story.service';
import { Location } from '@angular/common'
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';
@Component({
  selector: 'app-story',
  templateUrl: './story.page.html',
  styleUrls: ['./story.page.scss'],
})
export class StoryPage implements OnInit {
  story: any;
  updateStoryFg: FormGroup;
  maxChar = 2000;
  textValue = '';
  id: any;
  capturedPhoto: string = "";
  constructor(private photoService: PhotoService, private alertController: AlertController, private location: Location, private storyService: StoryService, public formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    this.getStory(this.id)
    this.fetchStory(this.id)
    console.log(this.id);

    this.updateStoryFg = this.formBuilder.group({
      title: [''],
      content: ['']
    })
  }
  getStory(id: any) {
    this.storyService.getStory(id).subscribe(response => {
      this.story = response;
      this.textValue = this.story.content
    });
  }
  goBack(): void {
    this.location.back()
  }
  fetchStory(id) {
    this.storyService.getStory(id).subscribe((data) => {
      this.updateStoryFg.setValue({
        title: data['title'],
        content: data['content'],
      });

    });
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
    if (!this.updateStoryFg.valid) {
      return false;
    } else {
      let blob = null;
      if (this.capturedPhoto != "") {
        const img = await fetch(this.capturedPhoto);
        blob = await img.blob();
      }
      this.storyService.updateStory(this.id, this.updateStoryFg.value, blob)
        .subscribe(() => {
        })
    }
  }
  async updateButton(id) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.onSubmit();
          },
        },
      ]
    });

    await alert.present();
  }
}
