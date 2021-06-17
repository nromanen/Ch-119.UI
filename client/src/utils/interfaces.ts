export interface RegisterData {
  name: string;
  phone: string;
  password: string;
  rpassword: string;
}

export interface ParamTypes {
  orderId: string;
}

export interface FeedbackFormI {
  text: string;
  rating: number;
  author_id: number;
  subject_id: number;
  orderId: number;
}
