const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const Event = require('./models/Event');
const Rsvp = require('./models/Rsvp');

module.exports = function(app, config) {
  /*
   |--------------------------------------
   | Authentication Middleware
   |--------------------------------------
   */
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    aud: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: 'RS256'
  });

  // Check for an authenticated admin user
  const adminCheck = (req, res, next) => {
    const roles = req.user[config.NAMESPACE] || [];
    if (roles.indexOf('admin') > -1) {
      next();
    } else {
      res.status(401).send({ message: 'Not authorized for admin access' });
    }
  };

  /*
   |--------------------------------------
   | API Routes
   |--------------------------------------
   */
  const _eventListProjection = 'title startDatetime endDatetime viewPublic';

  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

  // GET list of public events starting in the future
  app.get('/api/events', (req, res) => {
    Event.find({ viewPublic: true, startDatetime: { $gte: new Date() } },
      _eventListProjection, (err, events) => {
        let eventsArr = [];
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        if (events) {
          events.forEach(event => {
            eventsArr.push(event);
          });
        }
        res.send(eventsArr);
      }
    );
  });

  // GET list of all events, public and private (admin only)
  app.get('/api/events/admin', jwtCheck, adminCheck, (req, res) => {
    Event.find({}, _eventListProjection, (err, events) => {
        let eventsArr = [];
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        if (events) {
          events.forEach(event => {
            eventsArr.push(event);
          });
        }
        res.send(eventsArr);
      }
    );
  });

  // GET event by event ID
  app.get('/api/event/:id', jwtCheck, (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      if (!event) {
        return res.status(400).send({ message: 'Event not found.' });
      }
      res.send(event);
    });
  });

  // GET RSVPs by event ID
  app.get('/api/event/:eventId/rsvps', jwtCheck, (req, res) => {
    Rsvp.find({ eventId: req.params.eventId }, (err, rsvps) => {
      let rsvpsArr = [];
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      if (rsvps) {
        rsvps.forEach(rsvp => {
          rsvpsArr.push(rsvp);
        });
      }
      res.send(rsvpsArr);
    });
  });

};
