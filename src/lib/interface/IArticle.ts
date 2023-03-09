export interface IArticle {
  _id: string;
  headline: string;
  webUrl: string;
  source: string;
  author: string;
  pubDate: string;
}

export interface IOriginArticle {
  abstract: string;
  byline: {
    original: string;
    person: Array<{
      firstname: string;
      middlename?: string;
      lastname: string;
      qualifier?: string;
      title?: string;
      role: string;
      organization?: string;
    }>;
    organization: null | string;
  };
  document_type: string;
  headline: {
    main: string;
    kicker: string;
    content_kicker: null | string;
    print_headline: null | string;
    name: null | string;
    seo: null | string;
    sub: null | string;
  };
  keywords: Array<{
    name: string;
    value: string;
    rank: number;
    major: string;
  }>;
  lead_paragraph: string;
  multimedia: Array<{
    rank: number;
    subtype: string;
    caption: null | string;
    credit: null | string;
    type: string;
    url: string;
    height: number;
    width: number;
    legacy: {
      xlargewidth: number;
      xlarge: string;
      thumbnailheight: number;
      xlargeheight: number;
      thumbnail: string;
      widewidth: number;
      thumbnailwidth: number;
      widetile: string;
      wideheight: number;
    };
    subType: string;
    crop_name: string;
  }>;
  news_desk: string;
  print_page: string;
  print_section: string;
  pub_date: string;
  section_name: string;
  snippet: string;
  source: string;
  subsection_name: string;
  type_of_material: string;
  uri: string;
  web_url: string;
  word_count: number;
  _id: string;
}
