// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventsPage, { loader as eventsLoader } from './pages/EventsPage';
import EventDetailPage, { loader as eventDetailLoader, action as deleteEventAction } from './pages/EventDetailPage';
import NewEventPage from './pages/NewEventPage';
import EditEventPage from './pages/EditEventPage';
import RootLayout from './pages/Root';
import EventsRootLayout from './pages/EventsRoot';
import ErrorPage from './pages/ErrorPage';
import { action as manipulateEventAction } from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/NewsletterPage';

const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> }, // 기본 페이지 index: true로 설정
      {
        path: 'events', element: <EventsRootLayout />, children: [
          {
            index: true, element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            id: 'event-detail',
            // shared layout 없기 때문에 여기는 별도의 element 없음
            loader: eventDetailLoader,
            children: [
              {
                index: true, element: <EventDetailPage />,
                action: deleteEventAction,
              },
              { path: 'edit', element: <EditEventPage />, action: manipulateEventAction }
            ]
          },
          { path: 'new', element: <NewEventPage />, action: manipulateEventAction },
        ]
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ]
  },

]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
