var age = 26

for (let i = 0; i < 5; i++) {
  age += 5
}

try {
    console.log(i)
} catch (e) {
    console.log('i is out of scope! (used let!)')
}

