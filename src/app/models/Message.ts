/**
 * Created by e.emmeni on 28/06/17.
 */

interface Message {
  title : string
  content : string
  date : string
  emitter : string
  receiver : string
  status : string

}

interface Notification {
  titles : string
  content : string
  date : string
  emitter : string
  receiver : string
  status : string
  consultationId : string
}
