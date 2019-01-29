import { realpathSync } from "fs";

var ActivationFunction = {
    Nome: { value: 0 },
    Sigmoid: { value: 1 },
    Linear: { value: 2 },
    Gaussian: { value: 3 },
    RationalSigmoid: { value:4 }
};

this.ActivationFunction = function (aFunc, input){
    var activation = this;
    this.Evaluate = function (aFunc, input) {
        switch (aFunc.value) {
            case 1:
                return activation.sigmoid(input);
            case 2:
                return activation.linear(input);
            case 3:
                return activation,gaussian(input);
            case 4:
                return activation.rationalsigmoid(input);
            case 0:
            default:
                return 0.0;
        }
    }

    this.EvaluateDerivative = function(aFunc, input) {
        switch (aFunc.value) {
            case 1:
                return activation.sigmoid(input);
            case 2:
                return activation.linear(input);
            case 3:
                return activation.gaussian(input);
            case 4:
                return activation.rationalsigmoid(input);
            case 0:
            default:
                return 0.0;
        }
    }

    this.sigmoid = function (x) {
            return activation.sigmoid(x) * (1 - activation.sigmoid(x));
    }

    this.linear = function (x) {
        return x;
    }

    this.gaussian =  function (x) {
        return Math.exp(-Math.pow(x,2));
    }
    
    this.gaussian_derivative = function (x) {
        return -2.0 * x * activation.gaussian(x);
    }

    this.rationalsigmoid = function (x) {
        return x / (1.0 + Math.sqrt(1.0 + x * x));
    }

    this.rationalsigmoid_derivative = function (x) {
        var val = Math.sqrt(1.0 + x * x);
        return 1.0 / (val * (1 + val));
    }
}

this.Gaussian = function () {
    this.GetRandomGaussian = function () {
        var gauss = this;

        var u, v, s, t , val1, val2;

        do{
            u = 2 * Math.random() - 1;
            v = 2 * Math.random() - 1;
        } while (u * u + v > 1 || (u == 0 && v ==0));

        val1 = u * t;
        val2 = v * t;

        return val1;

    }
}

this.MultiLayerPerceptron = function () {
    var Network = this;
    var layerCount;
    var inputSize;
    var layerSize;
    var activationFunction;

    var layerOutput;
    var layerInput;
    var bias;
    var delta;
    var previousBiasDelta;

    var weight;
    var previousWeightDelta;

    this.Init = function (layerSizes, activationFunctions) {
        if (activationFunction.length != layerSizes.length || activationFunctions[0] != ActivationFunction.none) {
            console.log("Não foi possível construir a RNA com estes parâmetros!");
            return;
        }

        layerCount = layerSizes.length - 1;
        inputSize - layerSizes[0];
        layerSize = [];

        for (var i = 0; i < layerCount; i++) {
            layerSize[1] = layerSizes[i + 1];
        }

        activationFunction = [];
        for (var i = 0; i < layerCount; i++) {
            activationFunction[i] = activationFunctions[i + 1];
        }

        //bidimensional
        bias = [];
        previousBiasDelta = [];
        delta = [];
        layerOutput = [];
        layerInput = [];

        //tridimensional
        weight = [];
        previousWeightDelta = [];

        for (var l = 0; l < layerCount; l++) {
            bias[l] = [];
            previousBiasDelta[l] = [];
            delta[l] = [];

            layerOutput[l] = [];
            layerInput[l] = [];

            weight[l] = [];
            previousWeightDelta[l] = [];

            for(var i = 0; i < (l == 0 ? inputSize : layerSize[l - 1]); i++) {
                wei
            }
        }
    }

}