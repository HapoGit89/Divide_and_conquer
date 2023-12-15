function countZeroes(arr, val) {

    let leftIdx = 0;
    let rightIdx = arr.length - 1;


    while (leftIdx <= rightIdx) {
        // find the middle value
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let middleVal = arr[middleIdx];

        if ((middleVal == 1 && arr[middleIdx + 1] == 0)) {
            // found last 1 before zero, return length of right side
            return arr.length - 1 - middleIdx
        }
        if ((middleVal == 1 && arr[middleIdx + 1] == 1)) {
            // middleVal is too small, look at the right half
            leftIdx = middleIdx + 1;
        } else if (middleVal == 0 && middleIdx != 0) {
            // middleVal is too large, look at the left half
            rightIdx = middleIdx - 1;
        } else {
            if (arr[middleIdx] == 0) return arr.length
            else return 0
        }
    }
}



const sortedFrequency = (arr, val) => {
    // first search if number is in array at all

    let leftedge = 0
    let rightedge = arr.length - 1

    let leftIdx = 0;
    let rightIdx = arr.length - 1;
    let firstmatch = -1

    while (leftIdx <= rightIdx) {
        // find the middle value
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let middleVal = arr[middleIdx];

        if (middleVal < val) {
            // middleVal is too small, look at the right half
            leftIdx = middleIdx + 1;
        } else if (middleVal > val) {
            // middleVal is too large, look at the left half
            rightIdx = middleIdx - 1;
        } else {
            // we found our value!
            firstmatch = middleIdx;
            break
        }
    }

    // if val wasnt  found in arr, return -1
    if (firstmatch == -1) return -1

    // if val was found test if it is the only val in arr

    if (arr[firstmatch - 1] != val && arr[firstmatch + 1] != val) return 1

    // search for left edge of value field which (rightidx = firstmatch-1 leftidx =0)

    rightIdx = firstmatch - 1
    leftIdx = 0

    while (leftIdx <= rightIdx) {
        // test if we already got left edge
        if (arr[firstmatch - 1] != val) {
            leftedge = firstmatch
            break
        }
        // find the middle value
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let middleVal = arr[middleIdx];

        if (middleVal < val) {
            // middleVal is too small, look at the right half
            leftIdx = middleIdx + 1;
        } else if (middleVal == val && arr[middleIdx - 1] == val) {
            // middleVal is too large, look at the left half
            rightIdx = middleIdx - 1;
        } else {
            // we found our value!
            leftedge = middleIdx;
            break
        }
    }

    // search for right edge (leftidx = firstmatch+1 rightidx = arr.length-1)

    rightIdx = arr.length - 1
    leftIdx = leftedge + 1

    while (leftIdx <= rightIdx) {
        // test if we already got right edge
        if (arr[leftIdx + 1] != val) {
            rightedge = leftIdx
            break
        }
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let middleVal = arr[middleIdx];

        if (middleVal == val && arr[middleIdx + 1] == val) {
            // middleVal is too small, look at the right half
            leftIdx = middleIdx + 1;
        } else if (middleVal > val) {
            // middleVal is too large, look at the left half
            rightIdx = middleIdx - 1;
        } else {
            // we found our value!
            rightedge = middleIdx;
            break
        }
    }

    return rightedge - leftedge + 1


}


const findRotatedIndex = (arr, val) => {
    // first find rotation point
    const firstval = arr[0]
    let rotateIdx = -1
    let leftIdx = 0;
    let rightIdx = arr.length - 1;

    while (leftIdx <= rightIdx) {

        // find the middle value
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let middleVal = arr[middleIdx];

        if (middleVal > arr[middleIdx + 1]) {
            rotateIdx = middleIdx
            break
        }
        if (middleVal < arr[middleIdx + 1] && middleVal > firstval) {
            // middleVal is too small, look at the right half
            leftIdx = middleIdx + 1;

        } else if (middleVal < arr[middleIdx + 1] && middleVal < firstval) {
            // middleVal is too large, look at the left half
            rightIdx = middleIdx - 1;

        }
    }

    // check if rotateVal is target

    if (arr[rotateIdx] == val) return rotateIdx

    // check if target is bigger or less than first val and search und consequent site
    if (val > firstval) {


        let leftIdx = 0;
        let rightIdx = rotateIdx;

        while (leftIdx <= rightIdx) {
            // find the middle value
            let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
            let middleVal = arr[middleIdx];

            if (middleVal < val) {
                // middleVal is too small, look at the right half
                leftIdx = middleIdx + 1;
            } else if (middleVal > val) {
                // middleVal is too large, look at the left half
                rightIdx = middleIdx - 1;
            } else {
                // we found our value!
                return middleIdx;
            }


            // left and right pointers crossed, val isn't in arr
            return -1;
        }

    }
    else {

        let leftIdx = rotateIdx + 1;
        let rightIdx = arr.length - 1;

        while (leftIdx <= rightIdx) {
            // find the middle value
            let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
            let middleVal = arr[middleIdx];

            if (middleVal < val) {
                // middleVal is too small, look at the right half
                leftIdx = middleIdx + 1;
            } else if (middleVal > val) {
                // middleVal is too large, look at the left half
                rightIdx = middleIdx - 1;
            } else {
                // we found our value!
                return middleIdx;
            }
        }

        // left and right pointers crossed, val isn't in arr
        return -1;

    }
}


const findRotationCount = (arr) => {
    // first check whether it is a unrotated array:

    if (arr[0] < arr[arr.length - 1]) return 0

    // if rotated arr find the rotationIdx
    let rotateIdx = -1
    let leftIdx = 0;
    let rightIdx = arr.length - 1;
    let firstval = arr[0]

    while (leftIdx <= rightIdx) {

        // find the middle value
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let middleVal = arr[middleIdx];

        if (middleVal > arr[middleIdx + 1] && arr[middleIdx + 1] != undefined) {
            rotateIdx = middleIdx
            break
        }
        if (middleVal < arr[middleIdx + 1] && middleVal >= firstval) {
            // middleVal is too small, look at the right half
            leftIdx = middleIdx + 1;

        } else if (middleVal < arr[middleIdx + 1] && middleVal < firstval) {
            // middleVal is too large, look at the left half
            rightIdx = middleIdx - 1;

        }
    }

    return rotateIdx + 1

}



const findFloor = (arr, val) => {
    let leftIdx = 0;
    let rightIdx = arr.length - 1;

    while (leftIdx <= rightIdx) {
        // find the middle value
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let middleVal = arr[middleIdx];

        if (middleVal < val && arr[middleIdx + 1] < val) {
            // middleVal is too small, look at the right half
            leftIdx = middleIdx + 1;
        } else if (middleVal > val) {
            // middleVal is too large, look at the left half
            rightIdx = middleIdx - 1;
        } else {
            // we found our value!
            return arr[middleIdx];
        }
    }

    // left and right pointers crossed, val isn't in arr
    return -1;
}

console.log(findFloor([1, 2, 8, 10, 10, 12, 19], 0))





