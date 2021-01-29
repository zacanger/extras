import Profile from './profile'

export function getProfiles (req, res) {
  Profile.find({}, (err, profiles) => {
    if (err) {
      return res.status(500).send(err)
    }
    return res.status(200).send(profiles)
  })
}

export function postProfile (req, res) {
  console.log(req.body)
  new Profile(req.body).save((err, profile) => {
    if (err) {
      return res.status(500).send(err)
    }
    return res.status(201).send(profile)
  })
}

export function getProfile (req, res) {
  Profile.findById(req.params.profileId, (err, profile) => {
    if (err) {
      return res.status(500).send(err)
    }
    return res.status(200).send(profile)
  })
}

export function updateProfile (req, res) {
  Profile.findByIdAndUpdate(req.params.profileId, req.body, (err, updatedProfile) => {
    if (err) {
      return res.status(500).send(err)
    }
    return res.status(200).send(updatedProfile)
  })
}

export function deleteProfile(req, res) {
  Profile.findByIdAndRemove(req.params.profileId, (err, deletedProfile) => {
    if (err) {
      return res.status(500).send(err)
    }
    return res.status(200).send(deletedProfile)
  })
}

