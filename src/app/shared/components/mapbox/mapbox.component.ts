import { Component, OnInit, AfterViewInit, NgZone, EventEmitter, Output, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import { map, distinctUntilChanged, debounceTime, mergeMap, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit, AfterViewInit {

  @Output() coordinates = new EventEmitter<{ long: number, lat: number }>();
  @Input() long: number;
  @Input() lat: number;
  searchData: any;
  mapbox: any;
  searchedTerm: string;


  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap() {
    this.mapbox = this.zone.runOutsideAngular(() => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiaWJhcmFuZXNzIiwiYSI6ImNqdjlicGUyMzBtdHczeW5yemxybmQwdDIifQ.5NmW1S8Ks6-i8v22rJ0xiA';
      return new mapboxgl.Map({
        container: 'mapboxContainer',
        style: 'mapbox://styles/mapbox/streets-v11'
      });
    });
    if (this.lat && this.long) {
      this.mapbox.flyTo({
        center: [
          this.long,
          this.lat
        ],
        zoom: 15
      });
    }
    this.mapbox.on('click', (e) => {
      this.coordinates.emit({
        long: e.lngLat.lng,
        lat: e.lngLat.lat
      });
    });
    this.addMapControls();
  }

  private addMapControls() {
    const nav = new mapboxgl.NavigationControl();
    this.mapbox.addControl(nav, 'top-left');
  }

  constructor(private zone: NgZone, private http: HttpClient) { }

  ngOnInit() {
  }

  getHints(term: string): Observable<any> {
    const token = 'pk.eyJ1IjoiaWJhcmFuZXNzIiwiYSI6ImNqdjlicGUyMzBtdHczeW5yemxybmQwdDIifQ.5NmW1S8Ks6-i8v22rJ0xiA';
    return this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${term}.json?access_token=${token}`);
  }

  onSearch() {
    if (this.searchData && this.searchData.features) {
      const item = this.searchData.features[0].text;
      this.searchedTerm = item;
      this.onSelectedLocation({ item });
    }
  }

  onSelectedLocation(event) {
    if (this.searchData && this.searchData.features) {
      const feature = this.searchData.features.find(feat => feat.text === event.item);
      if (feature) {
        this.mapbox.flyTo({
          center: feature.center,
          zoom: 15
        });
        new mapboxgl.Marker()
          .setLngLat(feature.center)
          .addTo(this.mapbox);
        this.coordinates.emit({ long: feature.center[0], lat: feature.center[1] });
      }
    }

  }

  search(text$: Observable<string>): Observable<any> {
    const getHints = this.getHints.bind(this);
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      mergeMap(term => {
        return getHints(term).pipe(
          tap(data => {
            this.searchData = data;
          }),
          map((hints: any) => {
            if (hints && hints.features) {
              return hints.features.map(feature => feature.text)
            }
            return [];
          }),
          catchError(() => [])
        );
      })
    );
  }
}
